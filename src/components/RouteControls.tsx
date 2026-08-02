'use client';

import { useState, useRef, useCallback } from 'react';
import { MapPin, X, Plus, RotateCcw, Loader2, Navigation2, Trash2, CheckCircle2 } from 'lucide-react';
import { type RouteStop, type NominatimResult, searchNominatim } from '@/lib/useRoute';
import styles from './RouteControls.module.css';

/* ══════════════════════════════════════════════════════
   PlaceInput — text input with Nominatim autocomplete
   ══════════════════════════════════════════════════════ */

interface PlaceInputProps {
  id: string;
  placeholder: string;
  onSelect: (label: string, coords: [number, number]) => void;
}

function PlaceInput({ id, placeholder, onSelect }: PlaceInputProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(async (val: string) => {
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (val.length < 3) {
      setResults([]);
      setOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setBusy(true);
      const res = await searchNominatim(val);
      setResults(res);
      setOpen(res.length > 0);
      setBusy(false);
    }, 500);
  }, []);

  const handleSelect = (r: NominatimResult) => {
    const short = r.display_name.split(',')[0].trim();
    setQuery('');
    setResults([]);
    setOpen(false);
    onSelect(short, [parseFloat(r.lat), parseFloat(r.lon)]);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setOpen(false);
  };

  return (
    <div className={styles.inputWrap}>
      <MapPin size={13} className={styles.inputIcon} aria-hidden="true" />
      <input
        id={id}
        type="text"
        value={query}
        onChange={e => handleChange(e.target.value)}
        placeholder={placeholder}
        className={styles.placeInput}
        onFocus={() => results.length > 0 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        autoComplete="off"
        aria-label={placeholder}
        aria-autocomplete="list"
        aria-expanded={open}
      />

      {busy && (
        <Loader2 size={12} className={styles.inputSpinner} aria-hidden="true" />
      )}
      {query && !busy && (
        <button onClick={handleClear} className={styles.clearBtn} tabIndex={-1} aria-label="Clear input">
          <X size={10} />
        </button>
      )}

      {open && (
        <ul className={styles.dropdown} role="listbox">
          {results.map(r => (
            <li
              key={r.place_id}
              onMouseDown={() => handleSelect(r)}
              className={styles.dropdownItem}
              role="option"
            >
              <MapPin size={11} className={styles.dropdownIcon} aria-hidden="true" />
              <span>{r.display_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   RouteControls — main glassmorphic sidebar panel
   ══════════════════════════════════════════════════════ */

interface RouteControlsProps {
  stops: RouteStop[];
  startStop: RouteStop | null;
  endStop: RouteStop | null;
  midStops: RouteStop[];
  loading: boolean;
  error: string | null;
  onSetStart: (label: string, coords: [number, number]) => void;
  onSetDestination: (label: string, coords: [number, number]) => void;
  onAddStop: (label: string, coords: [number, number]) => void;
  onRemoveStop: (id: string) => void;
  onClearAll: () => void;
  onLoadExample: () => void;
}

export default function RouteControls({
  stops,
  startStop,
  endStop,
  midStops,
  loading,
  error,
  onSetStart,
  onSetDestination,
  onAddStop,
  onRemoveStop,
  onClearAll,
  onLoadExample,
}: RouteControlsProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${styles.panel} ${collapsed ? styles.collapsed : ''}`}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <Navigation2 size={14} className={styles.headerIcon} aria-hidden="true" />
        <span className={styles.headerTitle}>Route Planner</span>
        {loading && (
          <Loader2 size={13} className={styles.spinnerGlobal} aria-label="Fetching route…" />
        )}
        <button
          onClick={() => setCollapsed(c => !c)}
          className={styles.collapseBtn}
          aria-label={collapsed ? 'Expand route planner' : 'Collapse route planner'}
        >
          {collapsed ? '+' : '−'}
        </button>
      </div>

      {/* ── Body ── */}
      {!collapsed && (
        <div className={styles.body}>

          {/* Error banner */}
          {error && <p className={styles.errorMsg}>{error}</p>}

          {/* 1. Start Location */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>1. Start Point</span>
            {startStop ? (
              <div className={`${styles.badgeCard} ${styles.badgeStartCard}`}>
                <span className={`${styles.stopDot} ${styles.dotStart}`} />
                <span className={styles.badgeName}>{startStop.label}</span>
                <button
                  onClick={() => onRemoveStop(startStop.id)}
                  className={styles.removeBtn}
                  aria-label="Remove start point"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <PlaceInput
                id="route-start"
                placeholder="Where are you starting? (e.g., Airport)"
                onSelect={onSetStart}
              />
            )}
          </div>

          {/* 2. Stops along the way */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>2. Stops Along the Way</span>
            {midStops.map((stop, i) => (
              <div key={stop.id} className={styles.stopRow}>
                <span className={`${styles.stopDot} ${styles.dotMid}`} />
                <span className={styles.stopName}>
                  <strong>{i + 1}.</strong> {stop.label}
                </span>
                <button
                  onClick={() => onRemoveStop(stop.id)}
                  className={styles.removeBtn}
                  aria-label={`Remove ${stop.label}`}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <PlaceInput
              id="route-add-mid"
              placeholder="+ Add a stop (e.g., Kandy, Ella...)"
              onSelect={onAddStop}
            />
          </div>

          {/* 3. Destination */}
          <div className={styles.section}>
            <span className={styles.sectionLabel}>3. Final Destination</span>
            {endStop ? (
              <div className={`${styles.badgeCard} ${styles.badgeEndCard}`}>
                <span className={`${styles.stopDot} ${styles.dotEnd}`} />
                <span className={styles.badgeName}>{endStop.label}</span>
                <button
                  onClick={() => onRemoveStop(endStop.id)}
                  className={styles.removeBtn}
                  aria-label="Remove destination"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <PlaceInput
                id="route-end"
                placeholder="Where is your trip ending? (e.g., Galle)"
                onSelect={onSetDestination}
              />
            )}
          </div>

          {/* Footer: Reset / Example */}
          <div className={styles.footer}>
            {stops.length > 0 && (
              <button onClick={onClearAll} className={styles.clearAllBtn}>
                <Trash2 size={12} aria-hidden="true" />
                Clear All
              </button>
            )}
            <button onClick={onLoadExample} className={styles.resetBtn}>
              <CheckCircle2 size={12} aria-hidden="true" />
              Load Sample Route
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
