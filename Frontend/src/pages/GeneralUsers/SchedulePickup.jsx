// SchedulePickup.jsx
import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

const SchedulePickup = () => {
  return (
    <Card sx={{ padding: 2, borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Schedule Pickup</Typography>
        <Typography variant="body1">Select a date and time for your pickup.</Typography>
        {/* Add pickup scheduling form or functionality here */}
      </CardContent>
    </Card>
  );
};

export default SchedulePickup;
