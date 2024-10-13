import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import sriLankaCitiesGeoJson from './srilanka.json'; // GeoJSON file with city boundaries

const SriLankaCitiesMap = () => {
  const [citiesData, setCitiesData] = useState(null);

  // Fetch the GeoJSON data
  useEffect(() => {
    // If the GeoJSON is not local, fetch it from a server
    fetch('/path/to/sriLankaCitiesGeo.json')
      .then((response) => response.json())
      .then((data) => setCitiesData(data))
      .catch((error) => console.error('Error loading GeoJSON data:', error));
  }, []);

  // Generate random colors for the polylines
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const onEachCity = (city, layer) => {
    const randomColor = getRandomColor(); // Set random color for each city boundary

    layer.setStyle({
      color: randomColor,
      weight: 2,
      fillColor: 'transparent',
    });

    // Add hover or click actions if needed
    layer.on({
      mouseover: (event) => {
        event.target.setStyle({
          color: '#FFD700', // Highlight color on hover (yellow)
          weight: 3,
        });
      },
      mouseout: (event) => {
        event.target.setStyle({
          color: randomColor, // Reset to original color after hover
          weight: 2,
        });
      },
    });

    // Optionally, bind city names to the popup
    layer.bindPopup(`<strong>${city.properties.name}</strong>`);
  };

  return (
    <div className="h-screen">
      <MapContainer
        center={[7.8731, 80.7718]} // Center of Sri Lanka
        zoom={8}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />

        {/* Render GeoJSON cities if data is loaded */}
        {citiesData && (
          <GeoJSON
            data={citiesData}
            onEachFeature={onEachCity} // Function to style and handle each city
          />
        )}
      </MapContainer>
    </div>
  );
};

export default SriLankaCitiesMap;
