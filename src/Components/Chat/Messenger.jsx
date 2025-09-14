import { Box, Button, Divider, Grid, InputBase, List, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../Store/Store';
import socket from '../../lib/ws'
import Person from './Components/Person/Person';
import { ChatBox } from './Components/ChatBox';
import useUserData from '../../Hooks/useUserData';
import Avatar from '../../Components/Ui/Avatar/Avatar';
import { OnlineBadge } from '../../Components/Ui/OnlineBadge';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import NoMessagesImg from '../../Assets/Images/NoMessage.svg?react'
import styled from '@emotion/styled';

export default function Messenger() {
    const [selectedUser, setSelectedUser] = useState(null)
    const messages = useStore(s => s.messages)
    const uMs = useStore(s => s.unreadMessages)

    useEffect(() => {
        return () => {
            socket.selectedUser = null
            setSelectedUser(null)
        }
    }, [])

    // if (!uMs.size && !messages.size) return <NoMessages />

    return (
        <Grid container columnSpacing={2} p={2} height='var(--fullHeight)'>
            <Grid item xs={4} width='100%' height='100%'>
                <ChatList selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            </Grid>
            <Grid item xs={4} height='100%' pb={2}>
                <ChatBox data={selectedUser} />
            </Grid>
            <Grid item xs={4}>
                <UserProfile setSelectedUser={setSelectedUser} {...selectedUser} />
            </Grid>
        </Grid >
    );
}

function NoMessages() {
    return (
        <Box
            width='100%'
            height='calc(100% - var(--header))'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap={1}
            mt={-5}
        >
            <NoMessagesImg height={200} />
            <Typography variant='h5' fontWeight={600}>No messages yet</Typography>
            <Typography variant='h6' fontWeight={500}>Looks like you haven't received any message.</Typography>
        </Box>
    )
}

const Search = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#efefef',
    '&:hover': {
        backgroundColor: '#efefefcc',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(1)})`,
        transition: theme.transitions.create('width'),
        Width: '100%',
    },
}));

function ChatList({ selectedUser, setSelectedUser }) {
    const connectedUsers = useStore(s => s.connectedUsers)
    const [filter, setFilter] = useState([])

    function handleFilter(value) {
        const res = connectedUsers?.filter(o => o?.username?.includes(value))
        setFilter(res)
    }

    function handleChat(user) {
        setSelectedUser(user)
        socket.selectedUser = user.user_id
    }

    return (
        <>
            <List
                subheader={
                    <Search>
                        <StyledInputBase
                            onChange={(e) => handleFilter(e.target.value)}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: 'grey' }} />
                        </SearchIconWrapper>
                    </Search>
                }
                sx={{
                    bgcolor: 'white',
                    boxSizing: 'border-box',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    p: 0,
                    overflow: 'auto',
                    "::-webkit-scrollbar": {
                        width: '2px !important',
                        display: 'none'
                    },
                    "::-webkit-scrollbar-thumb": {
                        background: '#dee2e7'
                    }
                }}>
                {
                    !!connectedUsers.length &&
                    (
                        (!!filter.length && filter) ||
                        connectedUsers
                    ).map((user) => (
                        user?.room.status !== 'inactive' &&
                        // !user?.self &&
                        <Person
                            setSelectedUser={setSelectedUser}
                            key={user?.user_id}
                            sx={{
                                bgcolor: selectedUser?.user_id === user.user_id ?
                                    user?.room.status === 'blocked' ?
                                        'red' :
                                        'var(--brand)' :
                                    'var(--shade)',
                                width: '100%',
                                borderRadius: '20px',
                                py: 2,
                                color: selectedUser?.user_id === user.user_id ? 'white' : 'initial'
                            }}
                            onClick={() => handleChat(user)}
                            user={user}
                            active={selectedUser?.user_id === user.user_id}
                            blocked={user?.room.status === 'blocked'}
                        />
                    ))
                }
            </List>
        </>
    )
}

function UserProfile(room) {
    const deleteChat = useStore(s => s.deleteChat)
    const { user } = useUserData(room?.user_id)
    const blockedUsers = useStore(s => s.blockedUsers)

    const DP_SIZE = 80

    return (
        <Box display='grid' px={8} rowGap={3}>
            <Box width='100%' display='grid' justifyItems='center' gap={1}>
                <OnlineBadge online={room?.active} scale={1.5}>
                    <Avatar displayName={user.data?.displayName} profilePicture={user.data?.photo} sx={{ width: DP_SIZE, height: DP_SIZE }} />
                </OnlineBadge>
                <Typography variant='h5' fontWeight={600}>{user.data?.displayName}</Typography>
                <Typography variant='body2' color='GrayText' >Parice, France</Typography>
            </Box>
            <Box><Divider light sx={{ width: '100%' }} orientation='horizontal' /></Box>
            <Box width='100%' display='grid' gridTemplateColumns={'auto 1fr'} gap={2}>
                <Typography variant='body2' fontWeight={600}>Phone:</Typography>
                <Typography variant='body2' color='GrayText' >+918848990353</Typography>
                <Typography variant='body2' fontWeight={600}>Email:</Typography>
                <Typography variant='body2' color='GrayText' >{user.data?.email}</Typography>
                <Typography variant='body2' fontWeight={600}>DOB:</Typography>
                <Typography variant='body2' color='GrayText' >03-01-1997</Typography>
            </Box>
            <Box><Divider light sx={{ width: '100%' }} orientation='horizontal' /></Box>
            <Box display='grid' justifyItems='left'>
                {
                    blockedUsers?.includes(room?.user_id) ?
                        <Button onClick={() => socket.emit('unblock_room', room?.user_id)} sx={{ justifyContent: 'left', p: 1.5 }} fullWidth startIcon={<BlockIcon />} size='large' color='error'>Unblock user</Button>
                        :
                        <Button onClick={() => socket.emit('block_room', room?.user_id)} sx={{ justifyContent: 'left', p: 1.5 }} fullWidth startIcon={<BlockIcon />} size='large' color='error'>Block user</Button>
                }
                <Button onClick={() => {
                    socket.selectedUser = null
                    room?.setSelectedUser(null)
                    deleteChat(room?.room.id)
                }} sx={{ justifyContent: 'left', p: 1.5 }} fullWidth startIcon={<DeleteIcon />} size='large' color='error'>Delete Chat</Button>
            </Box>
        </Box>
    )
}
