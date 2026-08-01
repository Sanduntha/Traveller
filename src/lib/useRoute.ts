'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

/* ══════════════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════════════ */

export interface RouteStop {
  id: string;
  /** Short name used in the controls UI / geocoding */
  label: string;
  /** Card heading (e.g. "Start", "Stop 1", "Destination") */
  day: string;
  /** Card title */
  name: string;
  /** Card description */
  desc: string;
  /** [lat, lon] — Leaflet convention */
  coords: [number, number];
  zoom: number;
}

export interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

/* ══════════════════════════════════════════════════════
   Default / sample itinerary stops (available via button)
   ══════════════════════════════════════════════════════ */

export const SAMPLE_STOPS: RouteStop[] = [
  {
    id: 'colombo',
    label: 'Colombo',
    day: 'Start',
    name: 'Colombo Arrival',
    desc: 'Touch down at Bandaranaike International Airport. Settle into your luxury suite and enjoy a sunset cocktail overlooking the Indian Ocean.',
    coords: [6.927079, 79.861244],
    zoom: 10,
  },
  {
    id: 'galle',
    label: 'Galle',
    day: 'Stop 1',
    name: 'Galle Coastal Charm',
    desc: 'Travel south to the UNESCO-listed Galle Fort. Wander through cobblestone streets lined with boutiques, cafés, and colonial architecture. Relax on Unawatuna beach.',
    coords: [6.032813, 80.216796],
    zoom: 11,
  },
  {
    id: 'yala',
    label: 'Yala',
    day: 'Stop 2',
    name: 'Yala Safari',
    desc: "Embark on an exhilarating wildlife safari in Yala National Park. Spot elusive leopards, majestic elephants, and diverse birdlife in their natural habitat.",
    coords: [6.381282, 81.362145],
    zoom: 10,
  },
  {
    id: 'ella',
    label: 'Ella',
    day: 'Stop 3',
    name: 'Ella & Nine Arches',
    desc: "Ascend into the mist-shrouded hills. Take the scenic train to Ella, hike Little Adam's Peak, and marvel at the engineering of the Nine Arches Bridge.",
    coords: [6.866698, 81.046614],
    zoom: 11,
  },
  {
    id: 'sigiriya',
    label: 'Sigiriya',
    day: 'Destination',
    name: 'Cultural Triangle',
    desc: 'Explore the ancient rock fortress of Sigiriya, a masterpiece of ancient engineering. Conclude with a luxurious stay amidst ancient kingdoms before departure.',
    coords: [7.954108, 80.760269],
    zoom: 11,
  },
];

/* ══════════════════════════════════════════════════════
   Nominatim — forward geocoding (Sri Lanka only)
   ══════════════════════════════════════════════════════ */

export async function searchNominatim(query: string): Promise<NominatimResult[]> {
  if (!query.trim() || query.length < 3) return [];
  const params = new URLSearchParams({
    q: query,
    countrycodes: 'lk',
    format: 'json',
    limit: '5',
    addressdetails: '0',
  });
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?${params}`,
      { headers: { 'User-Agent': 'AyubowanSpatial/1.0 (portfolio-travel-app)' } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/* ══════════════════════════════════════════════════════
   Helper to combine start, stops, and destination
   ══════════════════════════════════════════════════════ */

function buildStopsArray(
  start: RouteStop | null,
  mid: RouteStop[],
  end: RouteStop | null
): RouteStop[] {
  const result: RouteStop[] = [];
  if (start) {
    result.push({ ...start, day: 'Start' });
  }
  mid.forEach((s, idx) => {
    result.push({ ...s, day: `Stop ${idx + 1}` });
  });
  if (end) {
    result.push({ ...end, day: 'Destination' });
  }
  return result;
}

/* ══════════════════════════════════════════════════════
   useRoute hook — no default values!
   ══════════════════════════════════════════════════════ */

export function useRoute() {
  const [startStop, setStartStop] = useState<RouteStop | null>(null);
  const [endStop, setEndStop] = useState<RouteStop | null>(null);
  const [midStops, setMidStops] = useState<RouteStop[]>([]);

  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(null);
  const [routeDistance, setRouteDistance] = useState<number | null>(null); // metres
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stops = buildStopsArray(startStop, midStops, endStop);

  /* Debounced OSRM fetch — fires 600 ms after any stop change */
  const triggerFetch = useCallback((nextStops: RouteStop[]) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (nextStops.length < 2) {
      setRouteCoords(null);
      setRouteDistance(null);
      setError(null);
      setLoading(false);
      return;
    }

    timerRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      const coordStr = nextStops.map(s => `${s.coords[1]},${s.coords[0]}`).join(';');
      const url = `https://router.project-osrm.org/route/v1/driving/${coordStr}?overview=full&geometries=geojson`;
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data.code === 'Ok' && data.routes?.[0]) {
            const route = data.routes[0];
            const coords = (route.geometry.coordinates as [number, number][]).map(
              ([lon, lat]) => [lat, lon] as [number, number]
            );
            setRouteCoords(coords);
            setRouteDistance(route.distance ?? null);
          } else {
            setError('Route unavailable — try different locations.');
            setRouteCoords(null);
            setRouteDistance(null);
          }
        } else {
          setError('Route service unavailable. Check your connection.');
        }
      } catch {
        setError('Could not fetch route — check your connection.');
      }
      setLoading(false);
    }, 600);
  }, []);

  /* Whenever startStop, midStops, or endStop change, fetch route */
  useEffect(() => {
    triggerFetch(stops);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startStop, midStops, endStop, triggerFetch]);

  /* ── Public actions ── */

  const setStart = useCallback((label: string, coords: [number, number]) => {
    setStartStop({
      id: `start-${Date.now()}`,
      label,
      day: 'Start',
      name: label,
      desc: `Starting location: ${label}`,
      coords,
      zoom: 11,
    });
  }, []);

  const setDestination = useCallback((label: string, coords: [number, number]) => {
    setEndStop({
      id: `end-${Date.now()}`,
      label,
      day: 'Destination',
      name: label,
      desc: `Final destination: ${label}`,
      coords,
      zoom: 11,
    });
  }, []);

  const addStop = useCallback((label: string, coords: [number, number]) => {
    setMidStops(prev => [
      ...prev,
      {
        id: `stop-${Date.now()}`,
        label,
        day: `Stop ${prev.length + 1}`,
        name: label,
        desc: `Intermediate stop: ${label}`,
        coords,
        zoom: 11,
      },
    ]);
  }, []);

  const removeStop = useCallback((id: string) => {
    if (startStop?.id === id) {
      setStartStop(null);
      return;
    }
    if (endStop?.id === id) {
      setEndStop(null);
      return;
    }
    setMidStops(prev => prev.filter(s => s.id !== id));
  }, [startStop, endStop]);

  const clearAll = useCallback(() => {
    setStartStop(null);
    setEndStop(null);
    setMidStops([]);
    setRouteCoords(null);
    setRouteDistance(null);
    setError(null);
  }, []);

  const loadExample = useCallback(() => {
    setStartStop(SAMPLE_STOPS[0]);
    setMidStops(SAMPLE_STOPS.slice(1, -1));
    setEndStop(SAMPLE_STOPS[SAMPLE_STOPS.length - 1]);
  }, []);

  return {
    stops,
    startStop,
    endStop,
    midStops,
    routeCoords,
    routeDistance,
    loading,
    error,
    setStart,
    setDestination,
    addStop,
    removeStop,
    clearAll,
    loadExample,
  };
}
