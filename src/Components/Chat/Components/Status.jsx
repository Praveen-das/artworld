import React from 'react';
import DoneIcon from '@mui/icons-material/DoneRounded';
import DoneAllIcon from '@mui/icons-material/DoneAllRounded';

export default function Status({ status, fontSize, color }) {
    return (
        <>
            {status === 'sent' ? <DoneIcon fontSize='small' color={color || 'disabled'} sx={{ fontSize }} /> :
                status === 'received' ? <DoneAllIcon fontSize='small' color={color || 'disabled'} sx={{ fontSize }} /> :
                    <DoneAllIcon fontSize='small' color={color || 'primary'} sx={{ fontSize }} />}
        </>
    );
}
