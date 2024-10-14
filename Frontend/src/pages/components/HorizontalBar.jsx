import React from 'react';
import { Box, Typography } from '@mui/material';

const HorizontalBar = ({ title = "Dashboard", userName = "Guest", style = {} }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#fff', boxShadow: '0px 1px 3px rgba(0,0,0,0.1)', ...style }}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">{userName}</Typography>
        </Box>
    );
};

export default HorizontalBar;
