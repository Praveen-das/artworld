import { Badge, IconButton, InputBase, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import socket from '../../../lib/ws';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '../../../Assets/Icons/sendIcon.svg?react'
import { useStore } from '../../../Store/Store';
import confirmAction from '../../../Components/Ui/ConfirmationDialog/ConfirmationDialog';
import Message from './Message';

export function ChatBox({ data }) {
    const [reply, setReply] = useState(null);
    const blockedUsers = useStore(s => s.blockedUsers)
    const isBlockedUser = blockedUsers.includes(data?.user_id)

    const boxRef = useRef();
    const [state, setState] = useState('initial');
    const userMessageStore = useStore(s => s.messages)
    const setMessages = useStore(s => s.setMessages)
    const userUnreadMessagesStore = useStore(s => s.unreadMessages)

    let roomId = data?.room?.id
    const messages = useMemo(() => userMessageStore.get(roomId) || [], [roomId, userMessageStore])

    useLayoutEffect(() => {
        const unreadMessages = userUnreadMessagesStore.get(roomId) || []
        if (!!unreadMessages.length) setMessages(roomId, unreadMessages)
    }, [userUnreadMessagesStore, roomId])

    useEffect(() => {
        boxRef.current.onscroll = (e) => {
            let ch = e.target.clientHeight;
            let sh = e.target.scrollHeight;
            let st = e.target.scrollTop;

            if (ch === sh) return;
            if (ch + st > sh - 50) setState('active');
            else setState('passive')
        }
        return () => {
            setState('initial')
        };
    }, [roomId]);

    const sendMessage = (message) => {
        if (isBlockedUser) {
            confirmAction(
                'Blocked user',
                'Unblock user to continue chatting.',
                () => socket.emit('unblock_room', data.user_id),
            )
            return
        }
        const payload = {
            message,
            to: data.user_id,
        }
        if (!userMessageStore.has(data.room.id)) {
            Object.assign(payload, { product_id: data.product_id })
            data.product_id = null
            delete data.product_id
        }
        socket.emit('user_chat', payload);
    };

    const sendReply = (message) => {
        if (isBlockedUser) return
        socket.emit(
            'user_chat',
            {
                ...reply,
                message,
                to: data.user_id,
            }
        );
        setReply(null);
    };

    function handleReply(reply) {
        setState('passive')
        setReply(reply)
    }

    function scrollIntoView(node) {
        node.scrollIntoView({ block: 'nearest' })
    }

    function handleDynamicScrolling(node, chat, i) {
        if (!node || reply) return;

        const self = socket.user_id === chat.from
        const parent = node.parentNode
        const isScrolledToBottom = parent.clientHeight >= parent.scrollHeight - 50

        if (self && chat.new) scrollIntoView(node);

        if (isScrolledToBottom) scrollIntoView(node);
        else if (state === 'initial' && !chat.new) scrollIntoView(node)

        if ((state !== 'passive' && chat.status === 'seen') || self) {
            chat.active = false
            chat.new = false
        }
        if (messages?.length === i + 1 &&
            !self &&
            chat.status !== 'seen'
        ) socket.emit('chatSeen', { user_id: chat?.from, roomId });
    }

    return (
        <Box
            boxSizing='border-box'
            position='relative'
            height='100%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            overflow='hidden'
        >
            <Box
                ref={boxRef}
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'scroll',
                    boxSizing: 'border-box',
                    p: '0.2rem',
                    bgcolor: 'var(--shade)',
                    boxShadow: '0 2px 5px #0000002e',
                    "::-webkit-scrollbar": {
                        width: '2px !important'
                    },
                    "::-webkit-scrollbar-thumb": {
                        background: '#dee2e7'
                    }
                }}
            >
                {
                    !!messages?.length &&
                    messages.map((chat, i) => chat && (
                        <Message
                            ref={node => handleDynamicScrolling(node, chat, i)}
                            chat={chat}
                            key={chat.receivedOn}
                            roomId={roomId}
                            setReply={(reply) => handleReply(reply)}
                            self={socket.user_id === chat.from}
                            index={i}
                        />
                    ))}
                <div style={{ minHeight: '0.5px', overflowAnchor: 'auto', marginTop: '-0.5px' }}></div>
            </Box>
            <Badge
                sx={{ justifySelf: 'center', translate: '0 -15px' }}
                badgeContent={messages?.some(o => o?.new && !o.self && state === 'passive') ? 'new' : 0}
                color="primary"
            />
            {reply &&
                <div id='mgs_reply'>
                    <Typography
                        variant='h10'
                        fontWeight={500}
                        noWrap
                    >
                        {reply.mainMessage}
                    </Typography>
                    <IconButton onClick={() => setReply(null)} sx={{ position: 'absolute', right: 0 }}>
                        <ClearIcon />
                    </IconButton>
                </div>}
            <TypeField disabled={Boolean(!data)} onSend={reply ? sendReply : sendMessage} />
        </Box >
    );
}

function TypeField({ disabled, onSend }) {
    const [message, setMessage] = useState('');

    return (
        <Box
            display='flex'
            width='-webkit-fill-available'
            py={1}
        >
            <InputBase
                placeholder='Type a message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant='outlined'
                sx={{ ml: 2, fontSize: '15px', fontWeight: 500 }}
                fullWidth
            />
            <IconButton
                disabled={disabled}
                onClick={() => onSend(message)}
                color='primary'
                size='large'
                sx={{
                    mr: 1, bgcolor: 'var(--brand)', ":hover": { bgcolor: 'var(--brand)' },
                    ".MuiTouchRipple-root": { color: 'white' }
                }}
            >
                <SendIcon style={{ fill: !disabled ? 'white' : 'rgb(189 189 189)', width: '16px', translate: '-1px' }} />
            </IconButton>
        </Box >
    )
}