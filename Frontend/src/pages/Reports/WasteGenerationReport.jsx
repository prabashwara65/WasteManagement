import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import axios from 'axios';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

function WasteGenerationReport() {
    const reportRef = useRef();
    const [collectorData, setCollectorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({
        labels: [], // X-axis labels (cities)
        datasets: [
            {
                label: 'Number of Collectors',
                data: [],
                borderColor: '#FF6347',
                backgroundColor: 'rgba(255, 99, 71, 0.2)',
                fill: true,
            },
        ],
    });

    // Update chart data based on collector data
    const updateChartData = (data) => {
        const cityCounts = {};

        // Count collectors by city
        data.forEach(item => {
            const { city } = item; // Assuming 'city' is a property in your data
            if (!cityCounts[city]) {
                cityCounts[city] = 0;
            }
            cityCounts[city]++;
        });

        const labels = Object.keys(cityCounts);
        const collectorCounts = Object.values(cityCounts);

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Number of Collectors',
                    data: collectorCounts,
                    borderColor: '#FF6347',
                    backgroundColor: 'rgba(255, 99, 71, 0.2)',
                    fill: true,
                },
            ],
        });
    };

    const handlePrint = useReactToPrint({
        content: () => reportRef.current,
        documentTitle: 'Zone-Based Garbage Collectors Report',
    });

    const handleDownloadPDF = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        const content = reportRef.current;

        doc.setTextColor(0, 0, 0);

        doc.html(content, {
            callback: function (doc) {
                doc.save('zone-based-garbage-collectors-report.pdf');
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

    // Fetching garbage collectors data from the server
    useEffect(() => {
        axios.get('http://localhost:3000/reports/viewCollectors') 
            .then(res => {
                const data = res.data; // Assuming data contains the collectors
                setCollectorData(data);
                updateChartData(data); // Update chart with the fetched data
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container p-4 h-screen mb-10">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Zone-Based Garbage Collectors Report</h1>
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
                    <h2 className="text-xl font-semibold text-black">Clean SCAPE: Garbage Collection System</h2>
                    <p className="text-sm text-gray-800">
                        Generated on: {new Date().toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-800">
                        Contact Us: CleanSCAPE@gmail.com
                    </p>
                </header>

                <main className="mb-5">
                    <h1 className="text-xl font-bold p-2">Zone-Based Garbage Collection Report</h1>
                    <h4 className="text-lg font-bold text-black">Purpose</h4>
                    <p className="text-black text-justify">
                        The purpose of this report is to monitor the number of garbage collectors operating in different cities. By analyzing this data, we can ensure optimal resource allocation and improve collection efficiency.
                    </p>

                    <h4 className="text-lg font-bold text-black mt-5">Key Metrics</h4>
                    <ul className="list-disc ml-5">
                        <li className="text-black">Total number of collectors by city</li>
                        <li className="text-black">Trends in collector distribution over time</li>
                        <li className="text-black">Comparative analysis of different zones</li>
                    </ul>

                    <h4 className="text-lg font-bold text-black mt-5 mb-2">
                        Total Collectors by City
                    </h4>
                    <div className="bg-white p-5 border rounded-lg mb-4">
                        {!loading && chartData && <Line data={chartData} />}
                    </div>

                    <h4 className="text-lg font-bold text-black mt-5">Data Analysis</h4>
                    {loading ? (
                        <p>Loading collector data...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : collectorData && collectorData.length > 0 ? (
                        <table className="table-auto w-full mt-4">
                            <thead className="bg-gray-400">
                                <tr className="font-semibold text-black text-center">
                                    <th className="px-4 py-2">City</th>
                                    <th className="px-4 py-2">Number of Collectors</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(chartData.datasets[0].data).map((count, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2 text-black border-2 text-center border-black">
                                            {chartData.labels[index]}
                                        </td>
                                        <td className="border px-4 py-2 text-black border-2 text-center border-black">
                                            {count[1]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No collector data available.</p>
                    )}

                    {/* Suggestions for Improvements */}
                    <h4 className="text-lg font-bold text-black mt-5">Suggestions for Improvement</h4>
                    <ul className="list-disc ml-5">
                        <li className="text-black">Consider increasing the number of collectors in cities with low counts to ensure adequate waste management.</li>
                        <li className="text-black">Optimize collection routes in areas with a high number of collectors to improve efficiency and reduce costs.</li>
                        <li className="text-black">Implement seasonal staffing adjustments based on historical data to meet demand during peak periods.</li>
                        <li className="text-black">Launch public awareness campaigns to encourage proper waste disposal and reduce waste generation.</li>
                        <li className="text-black">Regularly review collector data to adapt to changes in population density and waste generation trends.</li>
                    </ul>
                </main>

                <footer className="border-t pt-3">
                    <p className="text-sm text-gray-500">© 2024 Clean SCAPE Report System</p>
                </footer>
            </div>
        </div>
    );
}

export default WasteGenerationReport;
