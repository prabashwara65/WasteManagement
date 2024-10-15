import React, { useState, useEffect } from 'react';
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
  Avatar,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [formData, setFormData] = useState({});
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/genUserRoute/user/${user.id}`);
      setUserDetails(response.data);
      setFormData(response.data); // Initialize formData with fetched user details
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Name is required';
    if (!formData.nic) newErrors.nic = 'NIC is required';
    if (!formData.address_no) newErrors.address_no = 'Address No is required';
    if (!formData.address_street) newErrors.address_street = 'Street is required';
    if (!formData.address_city) newErrors.address_city = 'City is required';
    if (!formData.phone) newErrors.phone = 'Contact number is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.put(`http://localhost:3000/genUserRoute/update/${user.id}`, formData);
        setSuccessMessage('Profile updated successfully!');

        // Refetch updated user details to refresh the displayed data
        fetchUserDetails();

        // Make success message disappear after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } catch (error) {
        console.error('Error updating profile:', error);
        setErrors({ submit: 'Error updating profile. Please try again.' });
      }
    }
  };

  return (
    <Grid container spacing={3}>
      {/* User Details Section */}
      <Grid item xs={12} md={6}>
        <Card sx={{ padding: 2, borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '100%' }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              User Profile
            </Typography>
            <Avatar alt={userDetails.username} src={userDetails.profilePic} sx={{ width: 100, height: 100, marginBottom: 2 }} />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Name :</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.username}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>NIC :</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.nic}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Address No :</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.address_no}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Street :</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.address_street}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>City :</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.address_city}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Contact No :</strong></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{userDetails.phone}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1"><strong>Email :</strong></Typography>
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
        <Card sx={{ padding: 2, borderRadius: '16px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '100%' }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Update Profile
            </Typography>
            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}
            {errors.submit && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.submit}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal" error={Boolean(errors.username)}>
                <TextField
                  label="Name"
                  name="username"
                  variant="outlined"
                  value={formData.username || ''}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>{errors.username}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal" error={Boolean(errors.nic)}>
                <TextField
                  label="NIC"
                  name="nic"
                  variant="outlined"
                  value={formData.nic || ''}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>{errors.nic}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal" error={Boolean(errors.address_no)}>
                <TextField
                  label="Address No"
                  name="address_no"
                  variant="outlined"
                  value={formData.address_no || ''}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>{errors.address_no}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal" error={Boolean(errors.address_street)}>
                <TextField
                  label="Street"
                  name="address_street"
                  variant="outlined"
                  value={formData.address_street || ''}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>{errors.address_street}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal" error={Boolean(errors.address_city)}>
                <TextField
                  label="City"
                  name="address_city"
                  variant="outlined"
                  value={formData.address_city || ''}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>{errors.address_city}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal" error={Boolean(errors.phone)}>
                <TextField
                  label="Contact No"
                  name="phone"
                  variant="outlined"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  required
                />
                <FormHelperText>{errors.phone}</FormHelperText>
              </FormControl>

              <FormControl fullWidth margin="normal" error={Boolean(errors.email)}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={formData.email || ''}
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
