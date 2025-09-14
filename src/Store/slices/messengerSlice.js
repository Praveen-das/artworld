export default function messengerSlice(set) {
  const INITIAL_STATE = {
    unreadMessages: new Map(),
    messages: new Map(),
    connectedUsers: [],
    blockedUsers: [],
    chatWidget: { open: false, expanded: true, user: null },
  };

  return {
    ...INITIAL_STATE,
    setChatWidget: (open, expanded, user) =>
      set(({ chatWidget }) => {
        if (!open) return { chatWidget: { open, expanded: true, user: null } };
        else if (expanded) return { chatWidget: { expanded, open, user: user || chatWidget.user } };
        else return { chatWidget: { ...chatWidget, expanded } };
      }),
    setOnlineUsers: (connectedUsers) => set({ connectedUsers }),
    addOnlineUser: (user) => {
      set((state) => {
        if (state.connectedUsers.find((o) => o.user_id === user.user_id))
          return {
            connectedUsers: state.connectedUsers.map((o) => {
              if (o.user_id === user.user_id) {
                o.sid = user.sid;
                o.active = true;
              }
              return o;
            }),
          };
        return { connectedUsers: [...state.connectedUsers, user] };
      });
    },
    setUnreadMessages: (messages) =>
      set(({ unreadMessages, connectedUsers }) => {
        for (let [roomId, chats] of messages) {
          const user = connectedUsers.find((o) => o?.room.id === roomId);
          if (user) user.room.status = "active";

          if (unreadMessages.has(roomId)) {
            const um = unreadMessages.get(roomId);
            if (!chats.every((o) => um.some((c) => c.receivedOn === o.receivedOn))) um.push(...chats);
          } else unreadMessages.set(roomId, chats);
        }
        return { unreadMessages: new Map(unreadMessages), connectedUsers: [...connectedUsers] };
      }),
    setMessages: (roomId, arrayOfMessages) =>
      set((s) => {
        if (!arrayOfMessages.length) return;

        const user = s.connectedUsers.find((o) => o?.room.id === roomId);
        if (user) user.room.status = "active";

        s.messages.get(roomId)?.push(...arrayOfMessages) ?? s.messages.set(roomId, arrayOfMessages);
        s.unreadMessages.delete(roomId);
        return { messages: new Map(s.messages), unreadMessages: new Map(s.unreadMessages) };
      }),
    resetMessages: () => set(() => ({ unreadMessages: new Map(), messages: new Map() })),
    deleteMessage: (requests) =>
      set(({ messages, unreadMessages }) => {
        let mModified = false;
        let umModified = false;

        for (let [roomId, request] of requests) {
          const um = unreadMessages.get(roomId);
          const m = messages.get(roomId);

          for (let chatId of request) {
            if (um) {
              for (let chat of um) {
                if (chatId === chat.receivedOn) {
                  chat.message = "message deleted";
                  umModified = true;
                }
              }
            }
            if (m) {
              for (let chat of m) {
                if (chatId === chat.receivedOn) {
                  chat.message = "message deleted";
                  mModified = true;
                }
              }
            }
          }
        }

        if (mModified && umModified) return { messages: new Map(messages), unreadMessages: new Map(unreadMessages) };
        if (mModified) return { messages: new Map(messages) };
        if (umModified) return { unreadMessages: new Map(unreadMessages) };
      }),
    deleteChat: (uid) =>
      set((pre) => {
        pre.messages?.delete(uid);
        pre.connectedUsers?.forEach((user) => {
          if (user?.room.id === uid) user.room.status = "inactive";
        });
        const messages = new Map(pre.messages);
        return { messages, connectedUsers: [...pre.connectedUsers] };
      }),
    changeChatStatus: (roomId, status) =>
      set((pre) => {
        const collections = new Map(pre.messages);
        const messages = collections.get(roomId);
        messages?.forEach((chat) => {
          if (chat?.status !== "seen" || chat?.status !== status) chat.status = status;
        });
        return { messages: collections };
      }),
    makeActive: (uid, time) =>
      set((pre) => {
        pre.messages.get(uid)?.map((chat) => {
          if (chat.receivedOn === time) chat.active = true;
          return chat;
        });
        return { messages: new Map(pre.messages) };
      }),
    blockRoom: (list) =>
      set((pre) => {
        if (!list.length) return;
        pre.blockedUsers.push(...list);
        return { blockedUsers: [...pre.blockedUsers] };
      }),
    unblockRoom: (user_id) =>
      set((pre) => {
        pre.blockedUsers = pre.blockedUsers.filter((uid) => uid !== user_id);
        return { blockedUsers: [...pre.blockedUsers] };
      }),
    removeDisconnectedUser: (user) => {
      set((s) => ({
        connectedUsers: s.connectedUsers.map((o) => {
          if (o.user_id === user.user_id) {
            o.active = false;
            o.lastActive = user.lastActive;
          }
          return o;
        }),
      }));
    },
  };
}
