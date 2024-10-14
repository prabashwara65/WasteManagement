import React, { useState } from 'react';
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
    Modal,
    Fade,
    Backdrop,
} from '@mui/material';

const WasteManagement = () => {
    // Sample data for the table
    const tableData = [
        {
            id: 1,
            wasteType: 'Plastic',
            collectedBy: 'Company A',
            collectedFrom: 'User X',
            address: '123 Street, City',
            details: {
                quantity: 50,
                type: 'Plastic',
                date: '2024-10-12',
            },
        },
        {
            id: 2,
            wasteType: 'Food',
            collectedBy: 'Company B',
            collectedFrom: 'User Y',
            address: '456 Avenue, City',
            details: {
                quantity: 30,
                type: 'Food',
                date: '2024-10-13',
            },
        },
        {
            id: 2,
            wasteType: 'Food',
            collectedBy: 'Company B',
            collectedFrom: 'User Y',
            address: '456 Avenue, City',
            details: {
                quantity: 30,
                type: 'Food',
                date: '2024-10-13',
            },
        },
        {
            id: 2,
            wasteType: 'Food',
            collectedBy: 'Company B',
            collectedFrom: 'User Y',
            address: '456 Avenue, City',
            details: {
                quantity: 30,
                type: 'Food',
                date: '2024-10-13',
            },
        },
        {
            id: 2,
            wasteType: 'Food',
            collectedBy: 'Company B',
            collectedFrom: 'User Y',
            address: '456 Avenue, City',
            details: {
                quantity: 30,
                type: 'Food',
                date: '2024-10-13',
            },
        },
        // More sample data can be added
    ];

    const [openModal, setOpenModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleOpenModal = (record) => {
        setSelectedRecord(record);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedRecord(null);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Waste Management</Typography>

            {/* Cards */}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: '#F37979', color: '#fff', borderRadius: '12px' }}>
                        <CardContent>
                            <Typography variant="h6">Plastic</Typography>
                            <Typography variant="h4">150</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: '#99F379', color: '#fff', borderRadius: '12px' }}>
                        <CardContent>
                            <Typography variant="h6">Food</Typography>
                            <Typography variant="h4">120</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: '#F3B679', color: '#fff', borderRadius: '12px' }}>
                        <CardContent>
                            <Typography variant="h6">Paper</Typography>
                            <Typography variant="h4">75</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: '#79B8F3', color: '#fff', borderRadius: '12px' }}>
                        <CardContent>
                            <Typography variant="h6">E-Waste</Typography>
                            <Typography variant="h4">45</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Table */}
            <Box sx={{ marginTop: '20px' }}>
                <Card sx={{ borderRadius: '12px', padding: '10px' }}>
                    <TableContainer component={Paper} sx={{ borderRadius: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Waste Type</TableCell>
                                    <TableCell>Collected By</TableCell>
                                    <TableCell>Collected From</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.wasteType}</TableCell>
                                        <TableCell>{row.collectedBy}</TableCell>
                                        <TableCell>{row.collectedFrom}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleOpenModal(row)}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Box>

            {/* Modal */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={openModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 500,
                            bgcolor: 'background.paper',
                            borderRadius: '8px',
                            boxShadow: 24,
                            padding: '20px',
                        }}
                    >
                        {selectedRecord && (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    {selectedRecord.wasteType} Details
                                </Typography>
                                <Typography variant="body1">
                                    Collected By: {selectedRecord.collectedBy}
                                </Typography>
                                <Typography variant="body1">
                                    Collected From: {selectedRecord.collectedFrom}
                                </Typography>
                                <Typography variant="body1">
                                    Address: {selectedRecord.address}
                                </Typography>
                                <Typography variant="body1">
                                    Quantity: {selectedRecord.details.quantity}
                                </Typography>
                                <Typography variant="body1">
                                    Date: {selectedRecord.details.date}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default WasteManagement;
