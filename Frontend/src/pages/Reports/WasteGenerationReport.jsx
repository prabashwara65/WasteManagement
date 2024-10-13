import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

function WasteGenerationReport() {
    const reportRef = useRef();
    const [wasteData, setWasteData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({
        labels: [], // X-axis labels (e.g., time periods or areas)
        datasets: [
            {
                label: 'Total Waste Generated (tons)',
                data: [],
                borderColor: '#FF6347',
                backgroundColor: 'rgba(255, 99, 71, 0.2)',
                fill: true,
            },
        ],
    });

    const updateChartData = (data) => {
        const labels = [];
        const wasteAmounts = [];

        data.forEach(item => {
            labels.push(item.timePeriod);
            wasteAmounts.push(item.totalWaste);
        });

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Total Waste Generated (tons)',
                    data: wasteAmounts,
                    borderColor: '#FF6347',
                    backgroundColor: 'rgba(255, 99, 71, 0.2)',
                    fill: true,
                },
            ],
        });
    };

    const handlePrint = useReactToPrint({
        content: () => reportRef.current,
        onBeforeGetContent: () => {
            return Promise.resolve();
        },
        documentTitle: 'Waste Generation Report',
    });

    const handleDownloadPDF = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        const content = reportRef.current;

        doc.setTextColor(0, 0, 0);

        doc.html(content, {
            callback: function (doc) {
                doc.save('waste-generation-report.pdf');
            },
            x: 10,
            y: 10,
            html2canvas: {
                scale: 0.58,
                useCORS: true
            },
            margin: [10, 10, 10, 10],
            autoPaging: true,
            width: 1000,
            windowWidth: 950
        });
    };

    return (
        <div className="container p-4 h-screen mb-10">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Waste Generation Monitoring Report</h1>
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
                    <h2 className="text-xl font-semibold text-black">Waste Generation Monitoring System</h2>
                    <p className="text-sm text-gray-800">
                        Generated on: {new Date().toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-800">
                        Contact Us: WasteManagementSystem@gmail.com
                    </p>
                </header>

                <main className="mb-5">
                    <h1 className="text-xl font-bold p-2">
                        Waste Generation Report
                    </h1>
                    <h4 className="text-lg font-bold text-black">Purpose</h4>
                    <p className="text-black text-justify">
                        The purpose of this report is to monitor the amount of waste generated in different areas over time. By analyzing waste collection data, we can track waste generation trends, compare residential vs. commercial waste production, and optimize collection schedules accordingly.
                    </p>

                    <h4 className="text-lg font-bold text-black mt-5">Key Metrics</h4>
                    <ul className="list-disc ml-5">
                        <li className="text-black">Total waste generation by area</li>
                        <li className="text-black">Waste generation trends over time (increasing/decreasing)</li>
                        <li className="text-black">Seasonal waste generation trends (e.g., more waste during holidays)</li>
                        <li className="text-black">Comparison of residential vs commercial waste</li>
                    </ul>

                    <h4 className="text-lg font-bold text-black mt-5 mb-2">
                        Total Waste Generation Trends
                    </h4>
                    <div className="bg-white p-5 border rounded-lg mb-4">
                        {!loading && chartData && <Line data={chartData} />}
                    </div>

                    <h4 className="text-lg font-bold text-black mt-5">Data Analysis</h4>
                    {loading ? (
                        <p>Loading waste data...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : wasteData && wasteData.length > 0 ? (
                        <table className="table-auto w-full mt-4">
                            <thead className="bg-gray-400">
                                <tr className="font-semibold text-black text-center">
                                    <th className="px-4 py-2">Area</th>
                                    <th className="px-4 py-2">Total Waste (tons)</th>
                                    <th className="px-4 py-2">Type (Residential/Commercial)</th>
                                    <th className="px-4 py-2">Seasonal Trends</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wasteData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2 text-black border-2 text-center border-black">
                                            {item.area}
                                        </td>
                                        <td className="border px-4 py-2 text-black border-2 text-center border-black">
                                            {item.totalWaste} tons
                                        </td>
                                        <td className="border px-4 py-2 text-black border-2 text-center border-black">
                                            {item.type}
                                        </td>
                                        <td className="border px-4 py-2 text-black border-2 text-center border-black">
                                            {item.seasonalTrends}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No waste data available.</p>
                    )}
                </main>

                <footer className="border-t pt-3">
                    <p className="text-sm text-gray-500">© 2024 Waste Management System</p>
                </footer>
            </div>
        </div>
    );
}

export default WasteGenerationReport;
