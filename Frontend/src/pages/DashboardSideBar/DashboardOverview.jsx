import React from 'react';
import { Box, Grid, Card, CardContent, Typography, IconButton, LinearProgress } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { AccessTime, Assessment, PieChart } from '@mui/icons-material';  

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

const DashboardCards = () => {
  // Data for the Bar chart (Revenue data)
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 3000, 5000, 20000, 30000],
        backgroundColor: '#000080',
      },
    ],
  };

  // Data for the Line chart (User Growth data)
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'User Growth',
        data: [200, 430, 500, 800, 1000, 1100],
        fill: false,
        borderColor: '#FF0000',
        tension: 0.1,
        pointBackgroundColor: '#FF0000',
      },
    ],
  };

  return (
    <Box p={5}>
      <Grid container spacing={4}>
        {/* Overview Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: "200px" }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" fontWeight="bold">
                  Revenue
                </Typography>
                <IconButton>
                  <PieChart sx={{ color: "green" }} />
                </IconButton>
              </Box>
              <Typography variant="body2" color="textSecondary">
                The revenue growth indicates a successful response to market
                demands and highlights the effectiveness of our recent customer
                engagement initiatives.
              </Typography>
              <Box mt={3}>
                <Typography variant="body2">Revenue Progress</Typography>
                <LinearProgress
                  variant="determinate"
                  value={70}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "rgba(0, 128, 0, 0.3)", // Light green for the track
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "green", // Darker green for the progress indicator
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: "200px" }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" fontWeight="bold">
                  Activity
                </Typography>
                <IconButton>
                  <AccessTime sx={{ color: "green" }} />
                </IconButton>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Stay updated with the latest activities and user interactions,
                reflecting our continuous engagement and response to client
                needs.
              </Typography>

              <Box mt={3}>
                <Typography variant="body2">Task Complete Progress</Typography>
                <LinearProgress
                  variant="determinate"
                  value={50}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "rgba(0, 128, 0, 0.3)", // Light green for the track
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "green", // Darker green for the progress indicator
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Reports Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ minHeight: "200px" }}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6" fontWeight="bold">
                  Reports
                </Typography>
                <IconButton>
                  <Assessment sx={{ color: "green" }} />
                </IconButton>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Access comprehensive analytics and reports to gain insights into
                performance metrics and drive informed decision-making.
              </Typography>

              <Box mt={3}>
                <Typography variant="body2"> Report Generation Progress</Typography>
                <LinearProgress
                  variant="determinate"
                  value={60}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "rgba(0, 128, 0, 0.3)", // Light green for the track
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "green", // Darker green for the progress indicator
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart Card (Revenue Trends) */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Revenue Trends
              </Typography>
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top" } },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Line Chart Card (User Growth) */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                User Growth
              </Typography>
              <Line
                data={lineChartData}
                options={{
                  responsive: true,
                  plugins: { legend: { position: "top" } },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCards;
