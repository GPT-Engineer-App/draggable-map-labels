import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import { Box, Container } from '@chakra-ui/react';
import LocationForm from '../components/LocationForm';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Index = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState(null);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setNewLocation(e.latlng);
      },
    });
    return null;
  };

  const handleLocationSubmit = (name) => {
    setLocations([...locations, { name, position: newLocation }]);
    setNewLocation(null);
  };

  const handleCancel = () => {
    setNewLocation(null);
  };

  return (
    <Container maxW="full" height="100vh" p={0}>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        {locations.map((loc, idx) => (
          <Marker key={idx} position={loc.position} draggable={true}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {newLocation && (
        <Box position="absolute" top="10px" left="10px" zIndex="1000">
          <LocationForm onSubmit={handleLocationSubmit} onCancel={handleCancel} />
        </Box>
      )}
    </Container>
  );
};

export default Index;