import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend, Filler } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title, Legend, Filler);

function UserDistributionReport() {
    const reportRef = useRef();
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({
        labels: [], // X-axis labels (e.g., areas)
        datasets: [
            {
                label: 'Number of Users',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    });

    const updateChartData = (data) => {
        const labels = [];
        const userCounts = [];

        data.forEach(item => {
            labels.push(item.area);
            userCounts.push(item.userCount);
        });

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Number of Users',
                    data: userCounts,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        });
    };


    const handlePrint = useReactToPrint({
        content: () => reportRef.current,
        documentTitle: 'User Distribution Report',
    });

    const handleDownloadPDF = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        const content = reportRef.current;

        doc.html(content, {
            callback: function (doc) {
                doc.save('user-distribution-report.pdf');
            },
            x: 10,
            y: 10,
            html2canvas: { scale: 0.58, useCORS: true },
        });
    };

    return (
        <div className="container p-4 h-screen mb-5">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">User Distribution by Area</h1>
                <div className="flex space-x-4">
                    <button
                        onClick={handleDownloadPDF}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Download as PDF
                    </button>

                    <button
                        onClick={handlePrint}
                        disabled={loading || error}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Print Report
                    </button>
                </div>
            </div>

            <div ref={reportRef} className="bg-white p-10 border rounded-lg">
                <header className="mb-5 border-b pb-3">
                    <h2 className="text-xl font-semibold text-black">User Distribution System</h2>
                    <p className="text-sm text-gray-800">
                        Generated on: {new Date().toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-800">
                        Contact Us: UserDistributionSystem@gmail.com
                    </p>
                </header>

                <main className="mb-5">
                    <h1 className="text-xl font-bold p-2">User Distribution Report</h1>
                    <h4 className="text-lg font-bold text-black">Purpose</h4>
                    <p className="text-black text-justify">
                        The purpose of this report is to provide insights into the distribution of users across different areas. By analyzing the user distribution, we can identify areas with higher user concentrations and trends over time to make informed decisions.
                    </p>

                    <h4 className="text-lg font-bold text-black mt-5">Key Metrics</h4>
                    <ul className="list-disc ml-5">
                        <li className="text-black">Total number of users by area</li>
                        <li className="text-black">User distribution trends over time</li>
                        <li className="text-black">Comparison of user counts between different areas</li>
                    </ul>

                    <h4 className="text-lg font-bold text-black mt-5 mb-2">
                        User Distribution by Area
                    </h4>
                    <div className="bg-white p-5 border rounded-lg mb-4">
                        {!loading && chartData && <Bar data={chartData} />}
                    </div>

                    <h4 className="text-lg font-bold text-black mt-5">Data Analysis</h4>
                    {loading ? (
                        <p>Loading user data...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : userData.length > 0 ? (
                        <table className="table-auto w-full mt-4">
                            <thead className="bg-gray-400">
                                <tr className="font-semibold text-black text-center">
                                    <th className="px-4 py-2">Area</th>
                                    <th className="px-4 py-2">Number of Users</th>
                                    <th className="px-4 py-2">Growth Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2 text-black text-center border-black">
                                            {item.area}
                                        </td>
                                        <td className="border px-4 py-2 text-black text-center border-black">
                                            {item.userCount}
                                        </td>
                                        <td className="border px-4 py-2 text-black text-center border-black">
                                            {item.userCount > 100 ? 'Increasing' : 'Stable'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No user data available.</p>
                    )}
                </main>

                <footer className="border-t pt-3">
                    <p className="text-sm text-gray-500">© 2024 User Distribution System</p>
                </footer>
            </div>
        </div>
    );
}

export default UserDistributionReport;
