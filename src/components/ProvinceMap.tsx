'use client';

import { useEffect, useRef } from 'react';
import styles from './ProvinceMap.module.css';

interface Place {
    id: string;
    name: string;
    desc: string;
    lat: number;
    lon: number;
    img: string;
}

interface ProvinceMapProps {
    places: Place[];
    selectedPlace: Place | null;
    onPlaceSelect: (place: Place) => void;
    provinceName: string;
    provinceKey: string;
}

// Province bounding boxes [south, west, north, east]
const PROVINCE_BOUNDS: Record<string, [[number, number], [number, number]]> = {
    'western':       [[6.05, 79.82], [7.40, 80.18]],
    'central':       [[6.80, 80.35], [7.60, 81.10]],
    'southern':      [[5.90, 80.00], [6.55, 81.20]],
    'northern':      [[8.50, 79.65], [9.85, 80.90]],
    'eastern':       [[6.60, 81.10], [8.55, 82.00]],
    'north-western': [[7.35, 79.65], [8.45, 80.45]],
    'north-central': [[7.60, 80.10], [9.05, 81.35]],
    'uva':           [[6.40, 80.70], [7.25, 81.55]],
    'sabaragamuwa':  [[6.35, 80.00], [7.05, 80.95]],
};

function createNormalIcon(L: any) {
    return L.divIcon({
        className: '',
        html: `<div style="
            width: 22px; height: 22px;
            background: linear-gradient(135deg, #D4AF37, #f5d060);
            border: 2.5px solid #fff;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 3px 10px rgba(212,175,55,0.55);
            cursor: pointer;
            transition: transform 0.2s ease;
        "></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 22],
        popupAnchor: [0, -24],
    });
}

function createActiveIcon(L: any) {
    return L.divIcon({
        className: '',
        html: `<div style="position:relative; width:34px; height:34px;">
            <div style="
                position:absolute; top:0; left:0;
                width:34px; height:34px;
                background: rgba(45,90,39,0.25);
                border-radius: 50%;
                animation: pulse-ring 1.4s ease-out infinite;
            "></div>
            <div style="
                position:absolute; top:4px; left:4px;
                width:26px; height:26px;
                background: linear-gradient(135deg, #2d5a27, #4a8f3f);
                border: 3px solid #D4AF37;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                box-shadow: 0 5px 18px rgba(45,90,39,0.6);
                cursor: pointer;
            "></div>
        </div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -36],
    });
}

export default function ProvinceMap({ places, selectedPlace, onPlaceSelect, provinceName, provinceKey }: ProvinceMapProps) {
    const mapRef = useRef<any>(null);
    const mapInstanceRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);

    // Full map re-init when province changes
    useEffect(() => {
        if (typeof window === 'undefined') return;

        import('leaflet').then(L => {
            // Destroy any existing map instance before creating a new one
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                markersRef.current = [];
            }

            if (!mapRef.current) return;

            // Fix default icon
            delete (L.Icon.Default.prototype as any)._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });

            const map = L.map(mapRef.current, {
                center: [7.8731, 80.7718],
                zoom: 8,
                zoomControl: false, // we'll add it bottom-right
                scrollWheelZoom: true,
                attributionControl: true,
            });

            // Zoom control bottom right
            L.control.zoom({ position: 'bottomright' }).addTo(map);

            mapInstanceRef.current = map;

            // Custom tile style (CartoDB Positron - clean, elegant)
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '© OpenStreetMap contributors © CARTO',
                subdomains: 'abcd',
                maxZoom: 19,
            }).addTo(map);

            // Fit to province bounds
            const bounds = PROVINCE_BOUNDS[provinceKey];
            if (bounds) {
                map.fitBounds(bounds, { padding: [40, 40], animate: false });
            }

            const normalIcon = createNormalIcon(L);
            const activeIcon = createActiveIcon(L);

            // Add all markers
            places.forEach(place => {
                const isSelected = selectedPlace?.id === place.id;
                const marker = L.marker([place.lat, place.lon], {
                    icon: isSelected ? activeIcon : normalIcon
                }).addTo(map);

                marker.bindTooltip(`<div class="map-tooltip">${place.name}</div>`, {
                    permanent: false,
                    direction: 'top',
                    offset: [0, isSelected ? -36 : -24],
                    className: 'leaflet-province-tooltip',
                });

                marker.on('click', () => onPlaceSelect(place));

                (marker as any)._placeId = place.id;
                (marker as any)._normalIcon = normalIcon;
                (marker as any)._activeIcon = activeIcon;

                markersRef.current.push(marker);
            });

            // Pan to selected place if any
            if (selectedPlace) {
                map.setView([selectedPlace.lat, selectedPlace.lon], map.getZoom(), { animate: true });
            }
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                markersRef.current = [];
            }
        };
    }, [provinceKey]); // Re-init only when province changes

    // Update markers when places list changes (dynamic places added)
    useEffect(() => {
        if (!mapInstanceRef.current || typeof window === 'undefined') return;

        import('leaflet').then(L => {
            const map = mapInstanceRef.current;
            if (!map) return;

            const existingIds = new Set(markersRef.current.map((m: any) => m._placeId));
            const normalIcon = createNormalIcon(L);
            const activeIcon = createActiveIcon(L);

            places.forEach(place => {
                if (!existingIds.has(place.id)) {
                    const isSelected = selectedPlace?.id === place.id;
                    const marker = L.marker([place.lat, place.lon], {
                        icon: isSelected ? activeIcon : normalIcon
                    }).addTo(map);

                    marker.bindTooltip(`<div class="map-tooltip">${place.name}</div>`, {
                        permanent: false,
                        direction: 'top',
                        offset: [0, -24],
                        className: 'leaflet-province-tooltip',
                    });

                    marker.on('click', () => onPlaceSelect(place));
                    (marker as any)._placeId = place.id;
                    (marker as any)._normalIcon = normalIcon;
                    (marker as any)._activeIcon = activeIcon;
                    markersRef.current.push(marker);
                }
            });
        });
    }, [places]);

    // Update selected marker icon + pan to it
    useEffect(() => {
        if (!mapInstanceRef.current || !selectedPlace) return;

        import('leaflet').then(() => {
            const map = mapInstanceRef.current;
            if (!map) return;

            markersRef.current.forEach((marker: any) => {
                if (marker._placeId === selectedPlace.id) {
                    marker.setIcon(marker._activeIcon);
                    map.panTo([selectedPlace.lat, selectedPlace.lon], { animate: true, duration: 0.6 });
                } else {
                    marker.setIcon(marker._normalIcon);
                }
            });
        });
    }, [selectedPlace]);

    return (
        <div className={styles.mapWrapper}>
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                crossOrigin=""
            />
            <style>{`
                @keyframes pulse-ring {
                    0%   { transform: scale(0.6); opacity: 0.8; }
                    100% { transform: scale(2.2); opacity: 0; }
                }
                .leaflet-province-tooltip {
                    background: rgba(20,20,20,0.88) !important;
                    border: 1px solid rgba(212,175,55,0.5) !important;
                    border-radius: 8px !important;
                    color: #fff !important;
                    font-size: 0.78rem !important;
                    font-weight: 600 !important;
                    padding: 5px 10px !important;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.35) !important;
                    backdrop-filter: blur(8px);
                    white-space: nowrap;
                    font-family: inherit;
                }
                .leaflet-province-tooltip::before {
                    border-top-color: rgba(20,20,20,0.88) !important;
                }
                .leaflet-attribution-flag { display: none !important; }
            `}</style>
            <div className={styles.mapFloatingLabel}>
                <span>📍 {provinceName} Province</span>
                <span className={styles.mapHint}>Click a pin to explore</span>
            </div>
            <div ref={mapRef} className={styles.leafletMap} />
        </div>
    );
}
