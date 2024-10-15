import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ViewCityAssign from '../CityAssign/CityAssignCrud/View'; 

const AreaCard = ({ areaName, position }) => {
  return (
    <div className="flex flex-col bg-red-100 shadow-lg p-2 m-2 w-1/4 rounded-lg overflow-hidden">
      <h3 className="text-center text-lg font-bold mb-2">{areaName}</h3>
      <MapContainer
        center={position}
        zoom={10}
        style={{ height: "200px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

const CityAssign = () => {
  const [users, setUsers] = useState([]);
  const areas = [
    { name: 'Colombo', position: [6.9271, 79.8612], population: 752993 },
    { name: 'Kandy', position: [7.2906, 80.6337], population: 125400 },
    { name: 'Galle', position: [6.0535, 80.2200], population: 100000 },
    { name: 'Jaffna', position: [9.6615, 80.0255], population: 88138 },
  ];

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/Allusers'); // Adjust the URL based on your server setup
        const data = await response.json();
        setUsers(data); // Store the fetched users in state
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-[#FFFBF7] p-10">
      {/* Main container for flex cards */}
      <div className="flex justify-between">
        {areas.map((area, index) => (
          <AreaCard key={index} areaName={area.name} position={area.position} />
        ))}
      </div>

      {/* Main container for table */}
      <div className="bg-white shadow-lg p-4 mt-7 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Users by City</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              {areas.map((area) => (
                <th key={area.name} className="px-4 py-2 border-b text-left font-semibold">
                  {area.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {areas.map((area) => {
                // Filter users based on the area name
                const filteredUsers = users.filter(user => user.address_city === area.name);
                return (
                  <td key={area.name} className="border px-4 py-2">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <div key={user.id} className="text-sm text-gray-700 hover:text-blue-600 p-2">
                          {user.username}
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">No Users</div>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <ViewCityAssign />
      </div>
    </div>
  );
};

export default CityAssign;
