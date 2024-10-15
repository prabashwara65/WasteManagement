import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

function Report() {
    const reportRef = useRef();
    const [wasteData, setWasteData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({
        labels: [], // X-axis labels
        datasets: [
            {
                label: 'Predicted Waste Generation (tons)',
                data: [],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                fill: true,
            },
        ],
    });

    const updateChartData = (data) => {
        const labels = [];
        const wastePredictions = [];

        data.forEach(item => {
            const area = item.area;
            labels.push(area);
            wastePredictions.push(item.predictedWaste);
        });

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Predicted Waste Generation (tons)',
                    data: wastePredictions,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    fill: true,
                },
            ],
        });
    };

    // Fetch waste data from the API
    useEffect(() => {
        const fetchWasteData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/reports/viewPredicted');
                setWasteData(res.data);
                updateChartData(res.data); // Update chart data when waste data is fetched
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchWasteData();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => reportRef.current,
        documentTitle: 'Predictive Waste Generation Report',
    });

    const handleDownloadPDF = () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        const content = reportRef.current;

        doc.setTextColor(0, 0, 0);

        doc.html(content, {
            callback: function (doc) {
                doc.save('predictive-waste-report.pdf');
            },
            x: 10,
            y: 10,
            html2canvas: {
                scale: 0.58,
                useCORS: true,
                backgroundColor: '#fff'
            },
            margin: [10, 10, 10, 10],
            autoPaging: true,
            width: 1000,
            windowWidth: 950
        });
    };

    return (
      <div className="container p-4 h-screen mb-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">
            Predictive Waste Generation and Collection Report
          </h1>
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
            <h2 className="text-xl font-semibold text-black">
              Clean SCAPE: Garbage Collection System
            </h2>
            <p className="text-sm text-gray-800">
              Generated on: {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-800">
              Contact Us: CleanSCAPE @gmail.com
            </p>
          </header>

          <main className="mb-5">
            <h1 className="text-xl font-bold p-2">
              Predictive Waste Generation and Collection Report
            </h1>
            <h4 className="text-lg font-bold text-black">Purpose</h4>
            <p className="text-black text-justify">
              The purpose of this report is to forecast future waste generation
              and collection needs based on historical waste generation data,
              population growth trends, and seasonal waste patterns. By using
              predictive analytics, this report aims to provide actionable
              insights for optimizing waste collection efforts.
            </p>

            <h4 className="text-lg font-bold text-black mt-5">Key Metrics</h4>
            <ul className="list-disc ml-5">
              <li className="text-black">
                Predicted waste generation by area for the next month
              </li>
              <li className="text-black">
                Required collection frequency and resources based on forecasted
                growth
              </li>
              <li className="text-black">
                Suggested infrastructure expansion (e.g., new waste bins,
                collection trucks)
              </li>
            </ul>

            <h4 className="text-lg font-bold text-black mt-5 mb-2">
              Predicted Waste Generation Trend
            </h4>
            <div
              className="bg-white p-5 border rounded-lg mb-4"
              style={{ backgroundColor: "white" }}
            >
              {!loading && chartData && (
                <div style={{ backgroundColor: "white" }}>
                  <Line data={chartData} />
                </div>
              )}
            </div>

            <h4 className="text-lg font-bold text-black mt-5">Data Analysis</h4>
            {loading ? (
              <p>Loading waste data...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : wasteData.length > 0 ? (
              <table className="table-auto w-full mt-4">
                <thead className="bg-gray-400">
                  <tr className="font-semibold text-black text-center">
                    <th className="px-4 py-2">Area</th>
                    <th className="px-4 py-2">Description of Area </th>
                    <th className="px-4 py-2">Predicted Waste (tons)</th>
                    <th className="px-4 py-2">
                      Suggested Collection Frequency
                    </th>
                    <th className="px-4 py-2">Recommended Resources</th>
                  </tr>
                </thead>
                <tbody>
                  {wasteData.map((item, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 text-black border-2 text-center border-black">
                        {item.area}
                      </td>
                      <td className="border px-4 py-2 text-black border-2 text-center border-black">
                        {item.notes}
                      </td>
                      <td className="border px-4 py-2 text-black border-2 text-center border-black">
                        {item.predictedWaste} tons
                      </td>
                      <td className="border px-4 py-2 text-black border-2 text-center border-black">
                        {item.frequency}
                      </td>
                      <td className="border px-4 py-2 text-black border-2 text-center border-black">
                        {item.resources}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No predictive waste data available.</p>
            )}
          </main>

          <footer className="border-t pt-3">
            <p className="text-sm text-gray-500">
              © 2024 Clean SCAPE  Report System
            </p>
          </footer>
        </div>
      </div>
    );
}

export default Report;
