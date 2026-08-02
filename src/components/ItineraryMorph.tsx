'use client';

import dynamic from 'next/dynamic';
import styles from './ItineraryMorph.module.css';
import { useRoute } from '@/lib/useRoute';
import RouteControls from './RouteControls';
import TripPlan from './TripPlan';

/* Dynamic import — avoids SSR issues with Leaflet */
const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050f0a',
        color: 'rgba(212,175,55,0.35)',
        fontSize: '0.8rem',
        letterSpacing: '0.05em',
      }}
    >
      Loading map…
    </div>
  ),
});

/* ══════════════════════════════════════════════════════
   ItineraryMorph
   ══════════════════════════════════════════════════════ */

export default function ItineraryMorph() {
  const {
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
  } = useRoute();

  return (
    <div className="section" id="itinerary">
      <h2 className="section-title">The &ldquo;Best in Class&rdquo; AI Itinerary</h2>

      {/* ── Top section: Map (Left) + Route Planner (Right) ── */}
      <div className={styles.topSection}>
        
        {/* Left: Map */}
        <div className={styles.mapWrapper}>
          <div className={styles.mapContainer}>
            <MapClient
              locations={stops}
              activeLocationId={stops[0]?.id ?? ''}
              routeCoords={routeCoords}
              activeSegmentIndex={0}
            />
          </div>
        </div>

        {/* Right: Route Planner Sidebar */}
        <div className={styles.routeSidebar}>
          <h3 className={styles.sidebarTitle}>Design Your Route</h3>
          <p className={styles.sidebarDesc}>
            Customize your journey across Sri Lanka. Add your start location, intermediate stops, and final destination to build your route.
          </p>
          <RouteControls
            stops={stops}
            startStop={startStop}
            endStop={endStop}
            midStops={midStops}
            loading={loading}
            error={error}
            onSetStart={setStart}
            onSetDestination={setDestination}
            onAddStop={addStop}
            onRemoveStop={removeStop}
            onClearAll={clearAll}
            onLoadExample={loadExample}
          />
        </div>

      </div>

      {/* ── Trip planner below the map ── */}
      <div className={styles.plannerSection}>
        <TripPlan stops={stops} routeDistanceM={routeDistance} />
      </div>

    </div>
  );
}
