import { Box, Card, CardActionArea, CardContent, CardMedia, Menu, MenuItem, Typography } from '@mui/material'
import moment from 'moment'
import React, { useState } from 'react'
import './message.css'
import { forwardRef } from 'react'
import { memo } from 'react'
import Status from '../Components/Status'
import Expand from '@mui/icons-material/ExpandMore';
import socket from '../../../lib/ws'
import { useProduct } from '../../../Hooks/useProducts'
import { useNavigate } from 'react-router-dom'

const Message = forwardRef((
    {
        chat,
        roomId,
        setReply,
        self,
        index
    },
    ref
) => {
    const product = useProduct(chat?.product_id)
    const [hover, setHover] = useState(false)
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeletion = (id) => {
        socket.emit('delete', { type: 'delete', user_id: chat.to, roomId, chatId: id })
        handleClose()
    }

    const handleScrollIntoView = (key) => {
        const elm = document.querySelector(`[data-pointer="${key}"]`)
        // elm.scrollIntoView({block:'nearest',inline:'start'})
        elm.parentNode.scrollTop = elm.offsetTop;
        elm.classList.add('message_focus')
    }

    const removeClass = (e) => e.target.classList.remove('message_focus')

    return (
        <div
            data-pointer={chat.receivedOn}
            id='message_wrapper'
            onAnimationEnd={removeClass}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            ref={ref}
            style={{ overflowAnchor: 'none', alignSelf: self ? 'end' : 'start', justifyItems: self ? 'end' : 'start' }}
        >
            {
                product.data &&
                <Card onClick={() => navigate(`/shop/product/${product.data?.id}`)} sx={{ maxWidth: 345, width: '100%', boxShadow: '0px 0px 6px -2px rgba(0,0,0,0.2)' }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={product.data?.images && product.data.images[0]?.url}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {product.data?.name}
                            </Typography>
                            <Typography noWrap variant="body2" color="text.secondary">
                                {product.data?.desc}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            }
            < div
                id='message'
                className={
                    self ?
                        chat.message === 'message deleted' ? 'send_deleted' : 'send' :
                        chat.message === 'message deleted' ? 'receive_deleted' : 'receive'
                }
            >
                {
                    chat?.mainMessage &&
                    <Box
                        display='inline-grid'
                        width='100%'
                        backgroundColor={self ? '#00000029' : '#0000001c'}
                        borderRadius='0.8rem'
                        boxSizing='border-box'
                        p={1.5}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleScrollIntoView(chat?.pointer)}

                    >
                        <Typography
                            variant='h10'
                            fontWeight={500}
                            noWrap
                        >{chat?.mainMessage}</Typography>
                    </Box>
                }
                <p style={{ margin: 0, paddingInline: '0.35rem', fontWeight: 500, fontSize: '0.9rem', overflowWrap: 'anywhere' }} id='chat' >{chat.message}</p>
                {
                    chat.message !== 'message deleted' &&
                    <>
                        <span id='message_options' className='menu_button' style={{ '--msgbg': self ? 'var(--brand)' : 'var(--msgbg2)', position: 'absolute', right: '5px', bottom: 0 }} onClick={handleClick} >
                            <Expand fontSize='medium' cursor='pointer' />
                        </span>
                        <Menu
                            sx={{ borderRadius: '10px', translate: '0 -8px' }}
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'message_options',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            disablePortal
                            disableScrollLock
                        >
                            <MenuItem dense onClick={() => {
                                setReply({ mainMessage: chat.message, pointer: chat.receivedOn })
                                handleClose()
                            }}>Reply</MenuItem>
                            {
                                self &&
                                <MenuItem dense onClick={() => handleDeletion(chat.receivedOn)}>Delete</MenuItem>
                            }
                        </Menu>
                    </>
                }
            </div >
            <span className={self ? 'send_tag' : 'receive_tag'}>
                {`${moment(chat.time).format('LT')}`}
                {self && <Status status={chat.status || 'sent'} fontSize={16} />}
            </span>
        </div >
    )
})

export default memo(Message)
