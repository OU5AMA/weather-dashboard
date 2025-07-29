import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { reverseToCity } from '../api/api';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function ClickHandler({ setCoords, setCity }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setCoords({ lat, lon: lng });

      const cityName = await reverseToCity(lat, lng);
      setCity(cityName);
    },
  });

  return null;
}

export default function MapComponent({ setCoords, setCity }) {
  const defaultPosition = [34.020882, -6.841650]; // Rabat

  return (
    <div style={{ height: '400px', marginTop: '20px' }}>
      <MapContainer center={defaultPosition} zoom={6} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ClickHandler setCoords={setCoords} setCity={setCity} />
      </MapContainer>
    </div>
  );
}
