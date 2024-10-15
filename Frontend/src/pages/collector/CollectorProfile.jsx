import React from 'react';
import { useState, useEffect } from 'react';
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
} from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';


const CollectorProfile = () => {
    const [totalWasteByOneCollector, setTotalWasteByOneCollector] = useState(0);
    const [totalPlasticWaste, setTotalPlasticWaste] = useState(0);
    const [totalEwaste, setTotalEwaste] = useState(0);
    const [totalPolythene, setTotalPolythene] = useState(0);
    const [totalFoodWaste, setTotalFoodWaste] = useState(0);
    const user = useSelector((state) => state.user);
    const [userDetails, setUserDetails] = useState({}); // Replace with actual user data
    const [tableData, setTableData] = useState([]); // Replace with actual user data



    

    // Fetch total waste collected by the collector
    useEffect(() => {
        fetchAllWasteCount();
        fetchPlasticWaste();
        fetchEwaste();
        fetchPolytheneWaste();
        fetchFoodWaste();
        fetchUserDetails();
        fetchRecordOfCollector();

    }, []);

    // Fetch user details from the API
    const fetchUserDetails = async () => {
        try {
            // Fetch user details from the API
            const response = await axios.get(`http://localhost:3000/collectors/collector/${user.id}`);
            setUserDetails(response.data);
            console.log('User details:', data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    // Fetch total waste collected by the collector
    const fetchRecordOfCollector = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/wasteCollections/collectorCollectedData/${user.id}`);
            setTableData(response.data);
            console.log('Table data:', tableData);
        } catch (error) {
            console.error("Error fetching waste collected by collector", error);
        }
    }

    const fetchAllWasteCount = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/wasteCollections/countAllOneCollector/${user.id}`);
            setTotalWasteByOneCollector(response.data.data[0]['count(*)']);
        } catch (error) {
            console.error("Error fetching waste count", error);
        }
    }

    //fetch plastic waste
    const fetchPlasticWaste = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/wasteCollections/countAllPlasticsOneCollector/${user.id}`);
            setTotalPlasticWaste(response.data.data[0]['count(*)']);
        } catch (error) {
            console.error("Error fetching waste count", error);
        }
    }

    //fetch e-waste
    const fetchEwaste = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/wasteCollections/countAllEWasteOneCollector/${user.id}`);
            setTotalEwaste(response.data.data[0]['count(*)']);
        } catch (error) {
            console.error("Error fetching waste count", error);
        }
    }

    //fetch polythene waste
    const fetchPolytheneWaste = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/wasteCollections/countAllPolytheneOneCollector/${user.id}`);
            setTotalPolythene(response.data.data[0]['count(*)']);
        } catch (error) {
            console.error("Error fetching waste count", error);
        }
    }

    //fetch food waste
    const fetchFoodWaste = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/wasteCollections/countAllFoodOneCollector/${user.id}`);
            setTotalFoodWaste(response.data.data[0]['count(*)']);
        } catch (error) {
            console.error("Error fetching waste count", error);
        }
    }



    // Sample data for summary cards and table
    const summaryData = [
        { title: 'Total Collections', value: totalWasteByOneCollector },
        { title: 'Food Collections', value: totalFoodWaste },
        { title: 'Plastic Collection', value: totalPlasticWaste },
        { title: 'E-waste Collection', value: totalEwaste },
        { title: 'Polythene Collection', value: totalPolythene },
    ];



    return (
        <Box sx={{ padding: '20px' }}>
            {/* User Profile and Summary Cards in a Grid */}
            <Grid container spacing={2}>
                {/* User Profile Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', borderRadius: '16px', backgroundColor: '#ECFFDD' }}>
                        <CardContent>
                            <Typography variant="h5">{userDetails.name} Details</Typography>
                            <Typography variant="body1">Name: {userDetails.name}</Typography>
                            <Typography variant="body1">Email: {userDetails.email}</Typography>
                            <Typography variant="body1">Role: {userDetails.address}</Typography>
                            <Typography variant="body1">City: {userDetails.city}</Typography>
                            <Typography variant="body1">Phone: {userDetails.phone}</Typography>
                            <Typography variant="body1">Salary: {userDetails.salary}</Typography>

                        </CardContent>
                    </Card>
                </Grid>

                {/* Summary Collection Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', borderRadius: '16px', backgroundColor: '#ECFFDD' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Your Summary Collection
                            </Typography>
                            <Grid container spacing={2}>
                                {/* Total Collections Card taking full width */}
                                <Grid item xs={12}>
                                    <Card sx={{ padding: '10px', textAlign: 'center', borderRadius: '16px' }}>
                                        <CardContent>
                                            <Typography variant="body1">Total Collections</Typography>
                                        <Typography variant="h5">{totalWasteByOneCollector}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                {/* Other Summary Cards below - only two per row */}
                                {/* Other Summary Cards below - only two per row */}
                                {summaryData.slice(1).map((item, index) => {
                                    // Assign colors based on the index
                                    let backgroundColor;
                                    switch (index) {
                                        case 0:
                                            backgroundColor = '#F37979';
                                            break;
                                        case 1:
                                            backgroundColor = '#99F379';
                                            break;
                                        case 2:
                                            backgroundColor = '#F3B679'; // Dark Yellow
                                            break;
                                        case 3:
                                            backgroundColor = '#79B8F3';
                                            break;
                                        default:
                                            backgroundColor = 'white';
                                    }

                                    return (
                                        <Grid item xs={12} sm={6} md={6} key={index}>
                                            <Card sx={{ padding: '10px', textAlign: 'center', backgroundColor: backgroundColor, borderRadius: '16px' }}>
                                                <CardContent>
                                                    <Typography variant="body1">{item.title}</Typography>
                                                    <Typography variant="h5">{item.value}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Scrollable Table */}
            
            <Card sx={{ borderRadius: '16px', padding: '10px', backgroundColor: 'white', marginTop: '20px' }}>
                <Typography variant="h6" sx={{ marginTop: '10px', marginBottom: '10px' }}>
                    Collection Records
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300, borderRadius: '16px', padding:'5px' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>waste Type</TableCell>
                                <TableCell>Weight</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>City</TableCell>
                                <TableCell>Collected From</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row, index) => (
                                <TableRow key={index} sx={{backgroundColor: index % 2 === 0 ? 'white': '#ECFFDD'}}>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.weight}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.city}</TableCell>
                                    <TableCell>{row.username}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
};

export default CollectorProfile;
