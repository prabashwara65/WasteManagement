import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
} from '@mui/material';
import axios from 'axios';

const BinManagement = () => {
    const [bins, setBins] = useState([]);
    const [binType, setBinType] = useState('');
    const [userId, setUserId] = useState('');
    const [errors, setErrors] = useState({});
    const [openDialog, setOpenDialog] = useState(false); // For delete confirmation dialog
    const [binToDelete, setBinToDelete] = useState(null); // Store the ID of the bin to delete
    const [snackbarOpen, setSnackbarOpen] = useState(false); // For snackbar notification
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Message for snackbar

    useEffect(() => {
        const fetchBins = async () => {
            try {
                const response = await axios.get('http://localhost:3000/bins/getAllBins');
                setBins(response.data.data);
            } catch (error) {
                console.error("Error fetching bins", error);
            }
        };
        
        fetchBins();
    }, []);

    // Function to handle delete confirmation dialog open
    const handleOpenDialog = (binId) => {
        setBinToDelete(binId);
        setOpenDialog(true);
    };

    // Function to handle delete action
    const handleDelete = async () => {
        if (binToDelete) {
            try {
                await axios.delete(`http://localhost:3000/bins/delete/${binToDelete}`);
                setSnackbarMessage(`Deleted bin with ID: ${binToDelete}`);
                setSnackbarOpen(true);
                // Re-fetch bins after deletion
                const response = await axios.get('http://localhost:3000/bins/getAllBins');
                setBins(response.data.data);
            } catch (error) {
                console.error("Error deleting bin", error);
            } finally {
                // Close the dialog after the delete operation
                setOpenDialog(false);
                setBinToDelete(null);
            }
        }
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        let formErrors = {};

        // Validate User ID
        if (!userId) {
            formErrors.userId = "User ID is required.";
        } else if (isNaN(userId)) {
            formErrors.userId = "User ID must be a number.";
        }

        // Validate Bin Type
        if (!binType) {
            formErrors.type = "Bin Type is required.";
        }

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const newBin = {
            type: binType,
            assigned_user: Number(userId),
        };

        try {
            await axios.post('http://localhost:3000/bins/createBin', newBin);
            setBinType('');
            setUserId('');
            setErrors({});
            const response = await axios.get('http://localhost:3000/bins/getAllBins');
            setBins(response.data.data);
        } catch (error) {
            console.error("Error creating bin", error);
        }
    };

    // Function to handle Snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Bin Management</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ height: '100%', borderRadius: '16px', padding: '10px' }}>
                        <CardContent>
                            <Typography variant="h6">Bins Overview</Typography>
                            <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Bin ID</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Assigned User</TableCell>
                                            <TableCell>Created At</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bins.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{row.type}</TableCell>
                                                <TableCell>{row.username}</TableCell>
                                                <TableCell>{row.createdAt}</TableCell>
                                                <TableCell align="right">
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleOpenDialog(row.id)} // Open confirmation dialog
                                                    >
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', borderRadius: '16px', padding: '10px' }}>
                        <CardContent>
                            <Typography variant="h6">Add New Bin</Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Type"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: '10px' }}
                                    value={binType}
                                    onChange={(e) => setBinType(e.target.value)}
                                    error={!!errors.type}
                                    helperText={errors.type}
                                />
                                <TextField
                                    label="User ID"
                                    variant="outlined"
                                    fullWidth
                                    sx={{ marginBottom: '10px' }}
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    error={!!errors.userId}
                                    helperText={errors.userId}
                                />
                                <Button variant="contained" color="primary" fullWidth type="submit">
                                    Add Bin
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this bin?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                message={snackbarMessage}
            />
        </Box>
    );
};

export default BinManagement;
