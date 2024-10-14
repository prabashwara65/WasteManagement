import React from 'react';
import { MapContainer, TileLayer, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Sri Lanka approximate bounds
const sriLankaBounds = [
  [5.916, 79.652], // Southwest (minLat, minLng)
  [9.824, 81.879]  // Northeast (maxLat, maxLng)
];

// Divide into 4 rows and 2 columns (total 8 parts)
const rowCount = 4;
const colCount = 2;

const latStep = (sriLankaBounds[1][0] - sriLankaBounds[0][0]) / rowCount;
const lngStep = (sriLankaBounds[1][1] - sriLankaBounds[0][1]) / colCount;

// Generate map sections (bounding boxes)
const generateMapSections = () => {
  const sections = [];
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const southWest = [
        sriLankaBounds[0][0] + (row * latStep),
        sriLankaBounds[0][1] + (col * lngStep)
      ];
      const northEast = [
        sriLankaBounds[0][0] + ((row + 1) * latStep),
        sriLankaBounds[0][1] + ((col + 1) * lngStep)
      ];
      sections.push([southWest, northEast]);
    }
  }
  return sections;
};

const sections = generateMapSections();

const SriLankaGridMap = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {sections.map((bounds, index) => (
        <div key={index} className="relative overflow-hidden border border-gray-300" style={{ height: '150px' }}>
          {/* Use a div to mask the overflow */}
          <div className="absolute inset-0">
            <MapContainer
              bounds={bounds}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
              maxZoom={16} // Restrict max zoom
              minZoom={7}  // Set minimum zoom for better view
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Render rectangle showing the section bounds */}
              <Rectangle bounds={bounds} color="blue" weight={1} fillOpacity={0} />
            </MapContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SriLankaGridMap;
