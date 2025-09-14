import { CircularProgress } from '@mui/material'
import React from 'react'

function LoadingScreen() {

    return (
        <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
            <CircularProgress size={60} />
        </div>
    )
}

export default LoadingScreen