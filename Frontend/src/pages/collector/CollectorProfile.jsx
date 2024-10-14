import React from 'react';
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

const CollectorProfile = () => {
    // Sample data for summary cards and table
    const summaryData = [
        { title: 'Total Collections', value: 120 },
        { title: 'Pending Collections', value: 30 },
        { title: 'Completed Collections', value: 90 },
        { title: 'Collected Weight (kg)', value: 1500 },
        { title: 'Active Routes', value: 3 },
    ];

    const tableData = [
        { date: '2024-10-01', collectionAmount: 200, status: 'Completed' },
        { date: '2024-10-02', collectionAmount: 150, status: 'Pending' },
        { date: '2024-10-03', collectionAmount: 180, status: 'Completed' },
        { date: '2024-10-04', collectionAmount: 220, status: 'Completed' },
        { date: '2024-10-05', collectionAmount: 170, status: 'Pending' },
    ];

    return (
        <Box sx={{ padding: '20px' }}>
            {/* User Profile and Summary Cards in a Grid */}
            <Grid container spacing={2}>
                {/* User Profile Card */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', borderRadius: '16px', backgroundColor: 'green' }}>
                        <CardContent>
                            <Typography variant="h5">Logged User Details</Typography>
                            <Typography variant="body1">Name: John Doe</Typography>
                            <Typography variant="body1">Email: john.doe@example.com</Typography>
                            <Typography variant="body1">Role: Waste Collector</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Summary Collection Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', borderRadius: '16px', backgroundColor: 'aqua' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Summary Collection
                            </Typography>
                            <Grid container spacing={2}>
                                {/* Total Collections Card taking full width */}
                                <Grid item xs={12}>
                                    <Card sx={{ padding: '10px', textAlign: 'center', borderRadius: '16px' }}>
                                        <CardContent>
                                            <Typography variant="body1">Total Collections</Typography>
                                            <Typography variant="h5">{summaryData[0].value}</Typography>
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
            
            <Card sx={{ borderRadius: '16px', padding: '10px', backgroundColor: 'aqua', marginTop: '20px' }}>
                <Typography variant="h6" sx={{ marginTop: '10px', marginBottom: '10px' }}>
                    Collection Records
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300, borderRadius: '16px', padding:'5px' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Collection Amount</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell align="right">{row.collectionAmount}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
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
