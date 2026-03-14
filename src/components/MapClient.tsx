'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default Leaflet icon in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, {
            duration: 1.5,
            easeLinearity: 0.25,
        });
    }, [center, zoom, map]);
    return null;
}

interface MapProps {
    locations: Array<{ id: string, name: string, coords: [number, number], zoom: number }>;
    activeLocationId: string;
}

export default function ClientMap({ locations, activeLocationId }: MapProps) {
    const activeLoc = locations.find(loc => loc.id === activeLocationId) || locations[0];

    return (
        <MapContainer
            center={activeLoc.coords}
            zoom={activeLoc.zoom}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
            className="dark-green-map"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {locations.map((loc) => (
                <Marker key={loc.id} position={loc.coords}>
                    <Popup>{loc.name}</Popup>
                </Marker>
            ))}

            <MapController center={activeLoc.coords} zoom={activeLoc.zoom} />
        </MapContainer>
    );
}
