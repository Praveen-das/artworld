import { Badge, Box, IconButton, ListItem, ListItemAvatar, ListItemText, Menu as Menu, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import useCurrentUser from '../../../../Hooks/useCurrentUser'
import moment from 'moment'
import { useState } from 'react'
import Avatar from '../../../../Components/Ui/Avatar/Avatar'
import { OnlineBadge } from '../../../../Components/Ui/OnlineBadge'
import { useStore } from '../../../../Store/Store'
import Status from '../Status'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import socket from '../../../../lib/ws'

function Person(
    {
        user,
        sx,
        active,
        blocked,
        setSelectedUser,
        ...rest
    }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const { currentUser } = useCurrentUser()
    let messagesStore = useStore(s => s.messages);
    let deleteChat = useStore(s => s.deleteChat);
    const [lastChat, setLastChat] = useState(null)
    const setRerenderer = useState(0)[1]
    const unreadMessagesStore = useStore(s => s.unreadMessages)

    const size = unreadMessagesStore.get(user.room.id)?.length

    useEffect(() => {
        let messages = messagesStore.get(user?.room.id),
            unreadMessages = unreadMessagesStore.get(user.room.id),
            latestChat

        if (!!unreadMessages?.length) latestChat = unreadMessages?.at(-1)
        else latestChat = messages?.at(-1)

        setLastChat(latestChat);
    }, [messagesStore, unreadMessagesStore, user])

    useEffect(() => {
        let interval
        if (user && !user.active) {
            setRerenderer(pre => pre + 1)
            interval = setInterval(() => {
                setRerenderer(pre => pre + 1)
            }, 60000)
        }
        return () => clearInterval(interval)
    }, [user])

    const handleClick = (e) => {
        e?.stopPropagation()
        setAnchorEl(e.currentTarget);
    };

    const handleClose = (e) => {
        e?.stopPropagation()
        setAnchorEl(null);
    };

    const handleAction = (e) => {
        socket.selectedUser = null
        setSelectedUser(null)
        deleteChat(user?.room.id)
        handleClose(e)
    };

    return (
        <>
            <ListItem {...rest} sx={{
                ...sx, ":hover #long-button": {
                    opacity: '1 !important',
                    translate: '0px 0 !important',
                    width: 'unset'
                },
                ":hover #msg_unread": {
                    opacity: '0 !important',
                    translate: '-10px 0 !important',
                },
                gap: 2
            }} >
                <ListItemAvatar sx={{ minWidth: 'unset' }}>
                    <OnlineBadge online={user?.active}>
                        <Avatar displayName={user?.username} profilePicture={user.photo} />
                    </OnlineBadge>
                </ListItemAvatar>
                <Box
                    width='100%'
                    display='grid'
                    alignItems='center'
                    gap={.5}
                    color='inherit'
                >
                    <Box display='flex' width='100%'>
                        <Box display={'grid'}>
                            <Typography variant='h10' noWrap >{user?.username}</Typography>
                        </Box>
                        <Typography variant='h10' whiteSpace='nowrap' sx={{ marginLeft: 'auto' }}>{lastChat && moment(lastChat.receivedOn).format('LT')}</Typography>
                    </Box>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'inherit' }}>
                        {
                            lastChat?.self &&
                            <Status color={active ? 'inherit' : null} status={lastChat?.status} fontSize={18} />
                        }
                        <Box display={'grid'}>
                            <Typography variant='caption2' color={active && 'inherit'} noWrap >{lastChat?.message}</Typography>
                        </Box>
                        <div id='menu_wrapper'>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={Boolean(anchorEl) ? 'long-menu' : undefined}
                                aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                                size='small'
                                color='inherit'
                                sx={{ translate: '10px 0', opacity: 0, transition: 'translate 0.1s  ease-in-out, opacity 0.1s  ease-in-out', marginLeft: 'auto', position: 'absolute' }}
                            >
                                <ExpandMoreIcon fontSize='small' />
                            </IconButton>
                            <span id='msg_unread'>
                                <Badge badgeContent={size} color='primary' sx={{ "& .MuiBadge-badge": { fontSize: 9 } }} />
                            </span>
                        </div>
                        <Menu
                            sx={{ borderRadius: '10px', translate: '0 10px' }}
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'message_options',
                            }}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            disablePortal
                        >
                            <MenuItem dense onClick={(e) => handleAction(e, 'delete')}>Delete chat</MenuItem>
                        </Menu>
                    </div>
                </Box>
                {/* <ListItemText sx={{ textTransform: 'capitalize' }} >{user?.username}</ListItemText>
                    <ListItemText sx={{ fontSize: '8px !important' }}>
                        {
                            user?.active ?
                                'Online' :
                                moment(user?.lastActive).fromNow()
                        }
                    </ListItemText> */}
            </ListItem>
        </>
    )
}

export default Person


