import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function ItemCard({ name,to }) {
    return (
        <Box component={Link} to={to} sx={{
            aspectRatio: '1.8',
            boxShadow: '0px 10px 30px var(--neu)',
            display: 'grid',
            placeItems: 'center',
            borderRadius: 5,
            transition: '0.2s',
            ":hover": {
                background: 'var(--brand)',
                color: 'white !important',
                boxShadow: '0px 4px 5px #d1d1d1',
                translate: '0 -10px'
            }
        }}>
            <Typography textTransform='uppercase' fontWeight={500}>{name}</Typography>
        </Box>
    );
}

export default ItemCard
