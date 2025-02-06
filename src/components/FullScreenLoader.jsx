import React from 'react';
import { CircularProgress, Box } from "@mui/material";

const FullScreenLoader = () => {
    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.57)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        }}>
            <CircularProgress size={80} />
        </Box>
    );
}

export default FullScreenLoader;
