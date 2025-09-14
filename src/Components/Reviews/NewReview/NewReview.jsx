import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal, Rating, TextField } from '@mui/material';
import './newReview.css'
import useReviews from '../../../Hooks/useReviews';
import useCurrentUser from '../../../Hooks/useCurrentUser';
import confirmAction from '../../Ui/ConfirmationDialog/ConfirmationDialog';
import { Fade } from '@mui/material';

function NewReview({ product, open, setOpen, userReview }) {
    const [review, setReview] = useState({ title: '', message: '' })
    const [vote, setVote] = useState(null)
    const { addReview, updateReview, deleteReview } = useReviews()
    const { currentUser } = useCurrentUser()

    const box_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 5,
        outline: 'none'
    };

    useEffect(() => {
        if (!userReview) return
        setReview(userReview?.review)
        setVote(userReview?.vote || 1)
    }, [userReview])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userReview) {
            if (
                JSON.stringify(userReview.review) !==
                JSON.stringify(review) ||
                userReview.vote !== vote
            )
                return updateReview.mutateAsync({ review_id: userReview.id, updates: { review, vote, product_id: product?.id } })
                    .then(() => {
                        setReview({ title: '', review: '' })
                        setOpen(!open)
                    })
                    .catch(err => console.log(err))
            return alert('No changes have been made');
        }

        addReview.mutateAsync({ review, vote: vote || 1, product_id: product?.id })
            .then(() => {
                setReview({ title: '', review: '' })
                setOpen(!open)
            })
            .catch(err => console.log(err))
    }

    const handleDeletion = () => {
        confirmAction(
            'adasdasd',
            'adasdasd',
            () => deleteReview.mutateAsync(userReview?.id)
                .then(() => {
                    setOpen(!open)
                    setReview({ title: '', review: '' })
                    userReview = null
                })
                .catch(err => console.log(err))
        )

    }

    const handleClose = () => {
        setOpen(!open)
        setReview({ title: '', review: '' })
        setVote(1)
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Box sx={box_style}>
                        <form action="submit" onSubmit={handleSubmit}>
                            <div className='newReview'>
                                <IconButton
                                    onClick={handleClose}
                                    sx={{ position: 'absolute', top: 5, right: 5 }}>
                                    <CloseIcon />
                                </IconButton>
                                <label className='newReview_customer--name' >Hey {currentUser.data?.name}</label>
                                <p>Tell us about your experience</p>
                                <img className='button_primary' src={product?.images?.[0]?.url+ "/tr:w-400"} alt="" />
                                <label className='rate_this_product' >Rate this product</label>
                                <Rating
                                    value={vote || userReview?.vote}
                                    aria-required
                                    name="simple-controlled"
                                    onChange={(_, newValue) => setVote(newValue || 1)}
                                />
                                <TextField
                                    autoComplete='off'
                                    sx={{ mt: 1 }}
                                    required
                                    value={review?.title}
                                    onChange={(e) => setReview(pre => ({ ...pre, title: e.target.value }))}
                                    fullWidth
                                    type='text'
                                    size='small'
                                    id="outlined-basic"
                                    label="Title"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    sx={{ mt: 1 }}
                                    required
                                    value={review?.message}
                                    onChange={(e) => setReview(pre => ({ ...pre, message: e.target.value }))}
                                    fullWidth
                                    size='small'
                                    id="outlined-basic"
                                    rows={4}
                                    multiline
                                    label="Review"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                />
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button type='submit' className='button_secondary newReview_button'>
                                        {
                                            userReview ? 'Update review' : 'Submit your review'
                                        }
                                    </button>
                                    {
                                        userReview &&
                                        <button type='button' onClick={handleDeletion} className='button_secondary deleteReview_button' >Delete review</button>
                                    }
                                </div>
                            </div>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default NewReview