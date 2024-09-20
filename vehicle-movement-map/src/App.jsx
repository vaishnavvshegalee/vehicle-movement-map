import  { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const vehicleIcon = new L.Icon({
  iconUrl: 'Car.png', 
  iconSize: [25, 30],
  iconAnchor: [12, 30],
});

const App = () => {
  const [vehiclePosition, setVehiclePosition] = useState([17.385044, 78.486671]);
  const [routePath, setRoutePath] = useState([[17.385044, 78.486671]]);

  useEffect(() => {
    const fetchVehicleData = () => {
      fetch('http://localhost:8080/api/vehicle-location')
        .then((response) => response.json())
        .then((data) => {
          const newPosition = [data.latitude, data.longitude];
          setVehiclePosition(newPosition);
          setRoutePath((prevPath) => [...prevPath, newPosition]);
        })
        .catch((error) => console.error('Error fetching vehicle data:', error));
    };

    const interval = setInterval(fetchVehicleData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={vehiclePosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={vehiclePosition} icon={vehicleIcon} />
      <Polyline positions={routePath} color="green" />
    </MapContainer>
  );
};

export default App;
