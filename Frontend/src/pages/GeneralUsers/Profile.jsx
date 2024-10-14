// Profile.jsx
import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

const Profile = () => {
  return (
    <Card sx={{ padding: 2, borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>User Profile</Typography>
        <Typography variant="body1">Name: John Doe</Typography>
        <Typography variant="body1">Email: johndoe@example.com</Typography>
        <Typography variant="body1">Phone: (123) 456-7890</Typography>
        {/* Add more profile fields as needed */}
      </CardContent>
    </Card>
  );
};

export default Profile;
