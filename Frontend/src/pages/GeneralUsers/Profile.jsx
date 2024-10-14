// Profile.jsx
import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Alert,
  Avatar, // Import Avatar component
} from '@mui/material';

const Profile = () => {
  // State for user details
  const [userDetails] = useState({
    id: '001',
    name: 'John Doe',
    nic: '123456789V',
    address: '123 Main St',
    city: 'Anytown',
    contact: '(123) 456-7890',
    email: 'johndoe@example.com',
    profilePic: 'https://via.placeholder.com/150' // Add a placeholder URL or the actual image URL
  });

  // State for the form fields and validation errors
  const [formData, setFormData] = useState({ ...userDetails });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.nic) newErrors.nic = 'NIC is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.contact) newErrors.contact = 'Contact number is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccessMessage('Profile updated successfully!');
      // Here you can add the code to update user details
      console.log('Updated User Details:', formData);
    }
  };

  return (
    <Grid container spacing={3}>
      {/* User Details Section */}
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            padding: 2,
            borderRadius: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            height: '100%', // Set height to 100%
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              User Profile
            </Typography>
            <Avatar
              alt={userDetails.name}
              src={userDetails.profilePic}
              sx={{ width: 100, height: 100, marginBottom: 2 }} // Set size and margin
            />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>User ID:</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.id}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Name:</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>NIC:</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.nic}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Address:</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.address}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>City:</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.city}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Contact No:</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.contact}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Email:</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.email}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Update Profile Form Section */}
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            padding: 2,
            borderRadius: '16px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            height: '100%', // Set height to 100%
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Update Profile
            </Typography>
            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal" error={Boolean(errors.name)}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>{errors.name}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal" error={Boolean(errors.nic)}>
                <TextField
                  label="NIC"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>{errors.nic}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal" error={Boolean(errors.address)}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>{errors.address}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal" error={Boolean(errors.city)}>
                <TextField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>{errors.city}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal" error={Boolean(errors.contact)}>
                <TextField
                  label="Contact No"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>{errors.contact}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal" error={Boolean(errors.email)}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>{errors.email}</FormHelperText>
              </FormControl>

              <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
