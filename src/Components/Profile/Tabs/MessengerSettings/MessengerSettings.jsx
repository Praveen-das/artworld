import { Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStore } from '../../../../Store/Store';
import Avatar from '../../../Ui/Avatar/Avatar';
import socket from '../../../../lib/ws';


export default function MessengerSettings() {
    const blockedUsers = useStore(s => s.blockedUsers);
    const connectedUsers = useStore(s => s.connectedUsers);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const list = connectedUsers?.filter(o => blockedUsers?.includes(o.user_id));
        setUsers(list);
    }, [connectedUsers, blockedUsers]);

    const style = {
        title: { fontSize: 16, fontWeight: 600, color: "primary" },
        summery: { variant: "subtitle2", lineHeight: "30px", color: "#111" },
    };

    return (
        <Grid container>
            <Grid item xs={12} mb={2}>
                <Typography variant="tabTitle">
                    Chat Settings
                </Typography>
            </Grid>
            <Grid container>
                <Grid item xs={12} mb={2}>
                    <Typography {...style.title}>
                        Blocked users
                    </Typography>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {users.map((user, i) => (
                            <>
                                <ListItem
                                    secondaryAction={<Button onClick={() => socket.emit('unblock_room', user?.user_id)} variant='text'>Unblock</Button>}>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography fontWeight={500}>{user?.username}</Typography>}
                                        secondary={user?.user_id} />

                                </ListItem>
                                {i !== 0 || i + 1 !== users.length &&
                                    <Divider sx={{ width: '100%' }} />}
                            </>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Grid>
    );
}
