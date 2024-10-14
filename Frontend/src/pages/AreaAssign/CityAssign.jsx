import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AreaCard = ({ areaName, position }) => {
  return (
    <div className="flex flex-col bg-white shadow-lg p-4 m-4 w-1/4">
      <h3 className="text-center text-lg font-bold mb-2">{areaName}</h3>
      <MapContainer
        center={position}
        zoom={10}
        style={{ height: "200px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution="&copy; OpenStreetMap contributors"
        />
      </MapContainer>
    </div>
  );
};

const AreaAssign = () => {
  const areas = [
    { name: 'Colombo', position: [6.9271, 79.8612] },
    { name: 'Kandy', position: [7.2906, 80.6337] },
    { name: 'Galle', position: [6.0535, 80.2200] },
    { name: 'Jaffna', position: [9.6615, 80.0255] },
  ];

  return (
    <div className="bg-[#FFFBF7] p-10">
      {/* Main container for flex cards */}
      <div className="flex justify-between">
        {areas.map((area, index) => (
          <AreaCard key={index} areaName={area.name} position={area.position} />
        ))}
      </div>

      {/* Main container for table */}
      <div className="bg-white shadow-lg p-4 mt-7">
        <h2 className="text-xl font-bold mb-4">Area Data Table</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Area</th>
              <th className="px-4 py-2">Population</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Colombo</td>
              <td className="border px-4 py-2">752,993</td>
              <td className="border px-4 py-2">Details about Colombo</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Kandy</td>
              <td className="border px-4 py-2">125,400</td>
              <td className="border px-4 py-2">Details about Kandy</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Galle</td>
              <td className="border px-4 py-2">100,000</td>
              <td className="border px-4 py-2">Details about Galle</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Jaffna</td>
              <td className="border px-4 py-2">88,138</td>
              <td className="border px-4 py-2">Details about Jaffna</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AreaAssign;
