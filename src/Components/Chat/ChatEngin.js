import React, { Suspense, lazy, useEffect, useState } from "react";
import socket from '../../lib/ws';
import { useStore } from "../../Store/Store";
import { createRoomId } from "../../Utils/utils";
import useCurrentUser from '../../Hooks/useCurrentUser'

const ChatWidget = lazy(() => import("./ChatWidget"));

export default function ChatEngin() {
  const setOnlineUsers = useStore(s => s.setOnlineUsers);
  const addOnlineUser = useStore(s => s.addOnlineUser);
  const removeUser = useStore(s => s.removeDisconnectedUser);
  const setMessages = useStore(s => s.setMessages);
  const deleteMessage = useStore(s => s.deleteMessage);
  const setUnreadMessages = useStore(s => s.setUnreadMessages);
  const changeChatStatus = useStore(s => s.changeChatStatus);
  const blockRoom = useStore(s => s.blockRoom);
  const unblockRoom = useStore(s => s.unblockRoom);
  const { currentUser } = useCurrentUser()

  const { open, expanded } = useStore(s => s.chatWidget);

  useEffect(() => {
    if (!currentUser.data) return

    let user_id = currentUser.data?.id;
    let username = currentUser.data?.displayName || 'unknown user';
    let photo = currentUser.data?.photo || '';

    socket.auth = { user: { username, photo, user_id } };
    socket.user_id = user_id;

    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [currentUser.data])

  useEffect(() => {
    //-----------------get connected users-----------------//
    socket.on('users', ({ users, messages, requests, blockedUsers }) => {
      const onlineUsers = users.map((user) => {
        const id = createRoomId(user.user_id, socket.user_id);
        let self = user.user_id === socket.auth.user?.user_id
        return { ...user, room: { id, status: 'inactive' }, self };
      });
      setOnlineUsers(onlineUsers);
      setUnreadMessages(messages);
      deleteMessage(requests);
      blockRoom(blockedUsers);
    });

    //-----------------listen for newly connected users-----------------//
    socket.on("user connected", (user) => {
      const id = createRoomId(user.user_id, socket.user_id);
      let self = user.user_id === socket.auth.user?.user_id

      changeChatStatus(id, 'received');
      addOnlineUser({ ...user, room: { id, status: 'inactive' }, self });
    });

    //-----------------listen for disconnected users-----------------//
    socket.on("user disconnected", (user) => {
      removeUser(user)
    });

    //-----------------listen for messages-----------------//
    socket.on('receive', chat => {
      let
        self = chat.from === socket.user_id,
        roomId = createRoomId(chat.from, chat.to);

      if (self) chat.self = true;
      if (chat.from === socket.selectedUser) chat.active = true;
      if (self || chat.active || (open && expanded)) {
        setMessages(roomId,[chat]);
      }
      else setUnreadMessages([[roomId, [chat]]]);
    });

    socket.on('chatSeen', (roomId) => changeChatStatus(roomId, 'seen'));
    socket.on('roomBlocked', (user_id) => blockRoom([user_id]));
    socket.on('unblock_room', (user_id) => unblockRoom(user_id));
    socket.on('delete', request => deleteMessage(request));

    return () => {
      socket.off('connect');
      socket.off('disconnect');

      socket.off('users');
      socket.off('user connected');
      socket.off('user disconnected');
      socket.off('receive');
      socket.off('chatSeen');
      socket.off('roomBlocked');
      socket.off('unblock_room');
      socket.off('delete');
    };

    // eslint-disable-next-line
  }, [open, expanded]);

  return (
    <Suspense>
      {
        socket &&
        <ChatWidget />
      }
    </Suspense>
  );
}
