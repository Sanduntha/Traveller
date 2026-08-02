'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useMemo } from 'react';

/* ── Fix default Leaflet icons in React/Next.js ── */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/* ══════════════════════════════════════════════════════
   Custom DivIcon factory
   Creates premium dark glass markers with coloured rings
   ══════════════════════════════════════════════════════ */

type MarkerKind = 'start' | 'mid' | 'end';

const KIND_COLOR: Record<MarkerKind, string> = {
  start: '#4ade80',
  mid:   '#D4AF37',
  end:   '#D4AF37',
};

const KIND_SYMBOL: Record<MarkerKind, string> = {
  start: '▶',
  end:   '★',
  mid:   '', // filled in dynamically with stop number
};

function makeMarkerIcon(kind: MarkerKind, midLabel: string, isActive: boolean): L.DivIcon {
  const color = KIND_COLOR[kind];
  const symbol = kind === 'mid' ? midLabel : KIND_SYMBOL[kind];
  const size = isActive ? 30 : 24;
  const halfSize = size / 2;
  const fontSize = size < 27 ? 9 : 11;
  const glowRadius = isActive ? 12 : 6;
  // Pulse animation defined globally in globals.css
  const anim = isActive ? 'animation: markerPulse 2s ease-in-out infinite;' : '';

  const html = `
    <div style="
      width:${size}px;height:${size}px;
      background:rgba(4,14,9,0.93);
      border:${isActive ? 2.5 : 2}px solid ${color};
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      color:${color};
      font-size:${fontSize}px;font-weight:700;
      font-family:system-ui,sans-serif;
      box-shadow:0 0 ${glowRadius}px ${color}66,0 2px 8px rgba(0,0,0,0.65);
      opacity:${isActive ? 1 : 0.75};
      ${anim}
    ">${symbol}</div>`;

  return L.divIcon({
    html,
    className: '',
    iconSize:    [size, size],
    iconAnchor:  [halfSize, halfSize],
    popupAnchor: [0, -(halfSize + 4)],
  });
}

/* ══════════════════════════════════════════════════════
   Route segment utilities
   ══════════════════════════════════════════════════════ */

/** Find the index of the nearest coordinate in `coords` to `target` */
function nearestIdx(
  coords: [number, number][],
  target: [number, number]
): number {
  let minD = Infinity, minI = 0;
  for (let i = 0; i < coords.length; i++) {
    const d =
      (coords[i][0] - target[0]) ** 2 +
      (coords[i][1] - target[1]) ** 2;
    if (d < minD) { minD = d; minI = i; }
  }
  return minI;
}

/* ══════════════════════════════════════════════════════
   MapController — triggers flyTo on activeId change
   ══════════════════════════════════════════════════════ */

function MapController({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    // Cap the zoom so the route stays visible even when focused on a stop
    map.flyTo(center, Math.min(zoom, 11), { duration: 1.5, easeLinearity: 0.25 });
  }, [center, zoom, map]);
  return null;
}

/* ══════════════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════════════ */

export interface MapLocation {
  id: string;
  name: string;
  label?: string;
  coords: [number, number];
  zoom: number;
}

interface MapProps {
  locations: MapLocation[];
  activeLocationId: string;
  /** Full decoded route from OSRM as [lat, lon] pairs */
  routeCoords?: [number, number][] | null;
  /** Index of the currently active stop (for segment highlighting) */
  activeSegmentIndex?: number;
}

/* ══════════════════════════════════════════════════════
   ClientMap component
   ══════════════════════════════════════════════════════ */

export default function ClientMap({
  locations,
  activeLocationId,
  routeCoords,
  activeSegmentIndex = 0,
}: MapProps) {
  const activeLoc =
    locations.find(l => l.id === activeLocationId) ??
    locations[0] ?? {
      id: 'island',
      name: 'Sri Lanka',
      coords: [7.8731, 80.7718] as [number, number],
      zoom: 7,
    };

  /* ── Compute per-stop boundaries inside routeCoords ── */
  const boundaries = useMemo(() => {
    if (!routeCoords || routeCoords.length === 0) return [];
    return locations.map(loc => nearestIdx(routeCoords, loc.coords));
  }, [routeCoords, locations]);

  /* ── Slice the active segment from the full route ── */
  const activeSegCoords = useMemo<[number, number][] | null>(() => {
    if (!routeCoords || boundaries.length < 2) return null;
    const clampedIdx = Math.min(activeSegmentIndex, boundaries.length - 2);
    const from = boundaries[clampedIdx];
    const to   = boundaries[clampedIdx + 1];
    if (from == null || to == null || from === to) return null;
    const [lo, hi] = from < to ? [from, to] : [to, from];
    return routeCoords.slice(lo, hi + 1);
  }, [routeCoords, boundaries, activeSegmentIndex]);

  /* ── Polyline path options ── */
  const dimmedOpts: L.PathOptions = {
    color:     '#D4AF37',
    weight:    3.5,
    opacity:   0.45,
    dashArray: '10 6',
    lineCap:   'round',
    lineJoin:  'round',
  };
  const glowHaloOpts: L.PathOptions = {
    color:   '#D4AF37',
    weight:  14,
    opacity: 0.1,
  };
  const activeOpts: L.PathOptions = {
    color:   '#D4AF37',
    weight:  5,
    opacity: 0.95,
    lineCap: 'round',
    lineJoin:'round',
  };
  const activeGlowOpts: L.PathOptions = {
    color:   '#D4AF37',
    weight:  18,
    opacity: 0.2,
  };

  return (
    <MapContainer
      center={[7.8731, 80.7718]}   /* Sri Lanka island centre */
      zoom={7}                      /* shows the whole island */
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      className="dark-green-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* ── Full route — dimmed dashed line ── */}
      {routeCoords && routeCoords.length > 1 && (
        <>
          {/* Outer glow halo */}
          <Polyline positions={routeCoords} pathOptions={glowHaloOpts} />
          {/* Dashed core */}
          <Polyline positions={routeCoords} pathOptions={dimmedOpts} />
        </>
      )}

      {/* ── Active segment — bright solid line ── */}
      {activeSegCoords && activeSegCoords.length > 1 && (
        <>
          {/* Outer glow */}
          <Polyline positions={activeSegCoords} pathOptions={activeGlowOpts} />
          {/* Bright core */}
          <Polyline positions={activeSegCoords} pathOptions={activeOpts} />
        </>
      )}

      {/* ── Markers ── */}
      {locations.map((loc, idx) => {
        const kind: MarkerKind =
          idx === 0                    ? 'start' :
          idx === locations.length - 1 ? 'end'   :
                                         'mid';
        const isActive = loc.id === activeLocationId;
        const midLabel = kind === 'mid' ? String(idx) : '';

        return (
          <Marker
            key={loc.id}
            position={loc.coords}
            icon={makeMarkerIcon(kind, midLabel, isActive)}
          >
            <Popup>
              <strong>{loc.label ?? loc.name}</strong>
            </Popup>
          </Marker>
        );
      })}

      <MapController center={activeLoc.coords} zoom={activeLoc.zoom} />
    </MapContainer>
  );
}
