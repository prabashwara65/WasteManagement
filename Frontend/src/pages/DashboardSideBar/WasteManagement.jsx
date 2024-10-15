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
    Modal,
    Fade,
    Backdrop,
} from '@mui/material';
import axios from 'axios';

const WasteManagement = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [wasteData, setWasteData] = useState([]);
    const [foodCount, setFoodCount] = useState(0);
    const [plasticCount, setPlasticCount] = useState(0);
    const [polytheneCount, setPolytheneCount] = useState(0);
    const [eWasteCount, setEWasteCount] = useState(0);

    useEffect(() => {
        fetchWasteData();
        fetchFoodCount();
        fetchPlasticCount();
        fetchPolytheneCount();
        fetchEWasteCount();
    }, []);

    const fetchWasteData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/wasteCollections/getAllWasteCollectionCustome');
            setWasteData(response.data.data);
        } catch (error) {
            console.error("Error fetching wasteData", error);
        }
    };    

    const fetchFoodCount = async () => {
        try {
            const response = await axios.get('http://localhost:3000/wasteCollections/countAllFood');
            setFoodCount(response.data.data[0]['count(*)']);
        } catch (error) {
            console.error("Error fetching food count", error);
        }
    };

    const fetchPlasticCount = async () => {
        try {
            const response = await axios.get('http://localhost:3000/wasteCollections/countAllPlastics');
            setPlasticCount(response.data.data[0]['count(*)']);
        } catch (error) {
            console.error("Error fetching plastic count", error);
        }
    };

    const fetchPolytheneCount = async () => {
        try {
            const response = await axios.get('http://localhost:3000/wasteCollections/countAllPolythene');
            setPolytheneCount(response.data.data[0]['count(*)']);
        } catch (error) {
            console.error("Error fetching paper count", error);
        }
    };

    const fetchEWasteCount = async () => {
        try {
            const response = await axios.get('http://localhost:3000/wasteCollections/countAllEWaste');
            setEWasteCount(response.data.data[0]['count(*)']);
        } catch (error) {
            console.error("Error fetching e-waste count", error);
        }
    };

    

    const handleOpenModal = (record) => {
        console.log("Selected Record:", record);
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
                            <Typography variant="h4">{plasticCount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: '#99F379', color: '#fff', borderRadius: '12px' }}>
                        <CardContent>
                            <Typography variant="h6">Food</Typography>
                            <Typography variant="h4">{foodCount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: '#F3B679', color: '#fff', borderRadius: '12px' }}>
                        <CardContent>
                            <Typography variant="h6">Polythene</Typography>
                            <Typography variant="h4">{polytheneCount}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ backgroundColor: '#79B8F3', color: '#fff', borderRadius: '12px' }}>
                        <CardContent>
                            <Typography variant="h6">E-Waste</Typography>
                            <Typography variant="h4">{eWasteCount}</Typography>
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
                                    <TableCell>Weight</TableCell>
                                    <TableCell>Collected By</TableCell>
                                    <TableCell>Collected From</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {wasteData.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell>{row.weight}</TableCell>
                                        <TableCell>{row.collected_by}</TableCell>
                                        <TableCell>{row.collected_from}</TableCell>
                                        <TableCell>{row.date}</TableCell>
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
            >
                <Fade in={openModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            borderRadius: '8px',
                            boxShadow: 24,
                            padding: '20px',
                        }}
                    >
                        <Typography variant="h5">Waste Collection Details</Typography>
                        {selectedRecord ? (
                            <>
                                <Typography variant="body1">ID: {selectedRecord.id}</Typography>
                                <Typography variant="body1">Waste Type: {selectedRecord.type}</Typography>
                                <Typography variant="body1">Weight: {selectedRecord.weight} kg</Typography>
                                <Typography variant="body1">Collected By: {selectedRecord.collected_by}</Typography>
                                <Typography variant="body1">Time: {selectedRecord.time}</Typography>
                                <Typography variant="body1">Date: {selectedRecord.date}</Typography>
                                <Typography variant="body1">City: {selectedRecord.city}</Typography>
                                <Typography variant="body1">Collected From: {selectedRecord.collected_from}</Typography>
                                <Typography variant="body1">Bin ID: {selectedRecord.binId}</Typography>
                            </>
                        ) : (
                            <Typography variant="body1">No Record Selected</Typography>
                        )}
                    </Box>
                </Fade>
            </Modal>

        </Box>
    );
};

export default WasteManagement;
