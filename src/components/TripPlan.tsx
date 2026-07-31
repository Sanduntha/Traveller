'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, MapPin, DollarSign, Sunrise, Sun, Moon,
  Home, Utensils, Lightbulb, Loader2, Sparkles, RotateCcw,
  Clock, Route, Compass, Eye, ChevronDown, ChevronUp
} from 'lucide-react';
import { type RouteStop } from '@/lib/useRoute';
import { generateTripPlan, type TripSummary } from '@/lib/tripPlanGenerator';
import LocalGuideModal from './LocalGuideModal';
import styles from './TripPlan.module.css';

/* ══════════════════════════════════════════════════════
   DayCard — single day in the generated plan
   ══════════════════════════════════════════════════════ */

function DayCard({ day, index }: { day: TripSummary['days'][number]; index: number }) {
  const [modalOpen, setModalOpen] = useState(false);
  const totalPlaces =
    (day.placesToWatch?.length || 0) +
    (day.placesToEat?.length || 0) +
    (day.placesToStay?.length || 0);

  return (
    <motion.div
      className={styles.dayCard}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Day header */}
      <div className={styles.dayHeader}>
        <span className={styles.dayBadge}>Day {day.dayNumber}</span>
        <span className={styles.dayLocation}>
          <MapPin size={12} />
          {day.location}
        </span>
      </div>
      <h4 className={styles.dayTitle}>{day.title}</h4>

      {/* Activities */}
      <div className={styles.activities}>
        <div className={styles.activity}>
          <div className={styles.activityIcon}><Sunrise size={13} /></div>
          <div>
            <div className={styles.activityLabel}>Morning</div>
            <div className={styles.activityText}>{day.morning}</div>
          </div>
        </div>
        <div className={styles.activity}>
          <div className={styles.activityIcon}><Sun size={13} /></div>
          <div>
            <div className={styles.activityLabel}>Afternoon</div>
            <div className={styles.activityText}>{day.afternoon}</div>
          </div>
        </div>
        <div className={styles.activity}>
          <div className={styles.activityIcon}><Moon size={13} /></div>
          <div>
            <div className={styles.activityLabel}>Evening</div>
            <div className={styles.activityText}>{day.evening}</div>
          </div>
        </div>
      </div>

      {/* Footer: stay + food */}
      <div className={styles.dayFooter}>
        <div className={styles.footerItem}>
          <Home size={12} className={styles.footerIcon} />
          <span>{day.accommodation}</span>
        </div>
        <div className={styles.footerItem}>
          <Utensils size={12} className={styles.footerIcon} />
          <span>{day.mustTry.join(' · ')}</span>
        </div>
      </div>

      {/* Tip */}
      <div className={styles.tipBox}>
        <Lightbulb size={12} className={styles.tipIcon} />
        <span>{day.localTip}</span>
      </div>

      {/* ── Interactive Local Guide Popup Modal Button ── */}
      <button
        onClick={() => setModalOpen(true)}
        className={styles.exploreBtn}
      >
        <div className={styles.exploreBtnLeft}>
          <Compass size={15} className={styles.exploreBtnIcon} />
          <span>Explore {day.location}: Live Hotels, Inns, Pubs & Dining</span>
        </div>
        <div className={styles.exploreBtnRight}>
          <span className={styles.exploreBtnStatus}>Open Popup ↗</span>
        </div>
      </button>

      {/* ── Luxury Popup Modal ── */}
      <LocalGuideModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        dayNumber={day.dayNumber}
        location={day.location}
        placesToWatch={day.placesToWatch || []}
        placesToEat={day.placesToEat || []}
        placesToStay={day.placesToStay || []}
      />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════
   TripPlan — main exported component
   Handles days input, generation, and plan display
   ══════════════════════════════════════════════════════ */

interface TripPlanProps {
  stops: RouteStop[];
  routeDistanceM: number | null;
}

export default function TripPlan({ stops, routeDistanceM }: TripPlanProps) {
  const [days, setDays] = useState<Record<string, number>>({});
  const [plan, setPlan] = useState<TripSummary | null>(null);
  const [generating, setGenerating] = useState(false);

  const totalDays = Object.values(days).reduce((a, b) => a + (b || 0), 0);
  const hasAnyDays = totalDays > 0;

  const handleGenerate = async () => {
    setGenerating(true);
    // Brief "AI thinking" delay for realism
    await new Promise(r => setTimeout(r, 1600));
    const stopsWithDays = stops.map(s => ({
      id: s.id,
      label: s.label,
      name: s.name,
      days: days[s.id] || 0,
    }));
    const generated = generateTripPlan(stopsWithDays, routeDistanceM);
    setPlan(generated);
    setGenerating(false);
    // Scroll to plan
    setTimeout(() => {
      document.getElementById('trip-plan-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  const handleReset = () => {
    setDays({});
    setPlan(null);
  };

  return (
    <div className={styles.wrapper}>
      {/* ── Section header ── */}
      <div className={styles.sectionHeader}>
        <div className={styles.headerLeft}>
          <Sparkles size={18} className={styles.headerIcon} />
          <div>
            <h3 className={styles.sectionTitle}>Plan Your Journey</h3>
            <p className={styles.sectionSub}>
              Enter the number of nights at each stop — we&rsquo;ll generate your day-by-day itinerary
            </p>
          </div>
        </div>
        {plan && (
          <button onClick={handleReset} className={styles.resetPlanBtn}>
            <RotateCcw size={13} /> Reset Plan
          </button>
        )}
      </div>

      {/* ── Stop day inputs ── */}
      {stops.length === 0 ? (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: 'rgba(6, 78, 59, 0.04)',
          border: '1px dashed rgba(212, 175, 55, 0.25)',
          borderRadius: '14px',
          color: 'var(--color-text-muted)',
          fontSize: '0.9rem',
          marginBottom: '2rem',
        }}>
          Select a Start Point and Destination in the Design Your Route section above to start planning nights for each stop.
        </div>
      ) : (
        <div className={styles.stopInputGrid}>
          {stops.map((stop, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === stops.length - 1;
            const dotClass = isFirst
              ? styles.dotStart
              : isLast
              ? styles.dotEnd
              : styles.dotMid;

            return (
              <div key={stop.id} className={styles.stopInputCard}>
                <div className={styles.stopInputHeader}>
                  <span className={`${styles.stopDot} ${dotClass}`} />
                  <div className={styles.stopInfo}>
                    <span className={styles.stopDayTag}>{stop.day}</span>
                    <span className={styles.stopNameText}>{stop.label ?? stop.name}</span>
                  </div>
                </div>
                <div className={styles.inputRow}>
                  <label htmlFor={`days-${stop.id}`} className={styles.inputLabel}>
                    <Calendar size={12} /> Nights
                  </label>
                  <input
                    id={`days-${stop.id}`}
                    type="number"
                    min="0"
                    max="30"
                    value={days[stop.id] ?? ''}
                    placeholder="0"
                    className={styles.daysInput}
                    onChange={e => {
                      const val = Math.max(0, parseInt(e.target.value) || 0);
                      setDays(prev => ({ ...prev, [stop.id]: val }));
                      setPlan(null); // clear old plan when inputs change
                    }}
                  />
                  <span className={styles.inputSuffix}>
                    {(days[stop.id] ?? 0) === 1 ? 'night' : 'nights'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Summary bar + generate button ── */}
      <AnimatePresence>
        {hasAnyDays && (
          <motion.div
            className={styles.generateBar}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.generateBarInfo}>
              <Clock size={14} className={styles.barIcon} />
              <span>{totalDays}-night trip across {stops.filter(s => (days[s.id] || 0) > 0).length} destinations</span>
              {routeDistanceM && (
                <>
                  <span className={styles.barSep}>·</span>
                  <Route size={13} className={styles.barIcon} />
                  <span>{Math.round(routeDistanceM / 1000)} km total route</span>
                </>
              )}
            </div>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className={styles.generateBtn}
            >
              {generating ? (
                <>
                  <Loader2 size={14} className={styles.btnSpinner} />
                  Generating your plan…
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Generate {totalDays}-Night Itinerary
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Generated plan ── */}
      <AnimatePresence>
        {plan && (
          <motion.div
            id="trip-plan-result"
            className={styles.planResult}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Plan header */}
            <div className={styles.planHeader}>
              <h3 className={styles.planTitle}>{plan.tripTitle}</h3>
              <p className={styles.planRoute}>{plan.stopNames.join(' → ')}</p>
            </div>

            {/* Summary stats */}
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <Calendar size={16} className={styles.statIcon} />
                <div className={styles.statValue}>{plan.totalDays}</div>
                <div className={styles.statLabel}>Total Nights</div>
              </div>
              {plan.totalDistanceKm && (
                <div className={styles.statCard}>
                  <Route size={16} className={styles.statIcon} />
                  <div className={styles.statValue}>{plan.totalDistanceKm} km</div>
                  <div className={styles.statLabel}>Driving Distance</div>
                </div>
              )}
              <div className={styles.statCard}>
                <DollarSign size={16} className={styles.statIcon} />
                <div className={styles.statValue}>{plan.budget.mid}</div>
                <div className={styles.statLabel}>Mid-range Budget</div>
              </div>
              <div className={styles.statCard}>
                <MapPin size={16} className={styles.statIcon} />
                <div className={styles.statValue}>{plan.stopNames.length}</div>
                <div className={styles.statLabel}>Destinations</div>
              </div>
            </div>

            {/* Best months */}
            <div className={styles.bestMonths}>
              <Sun size={14} className={styles.bestIcon} />
              <strong>Best months:</strong>&nbsp;{plan.bestMonths}
            </div>

            {/* Day-by-day plan */}
            <h4 className={styles.subsectionTitle}>Day-by-Day Itinerary</h4>
            <div className={styles.daysGrid}>
              {plan.days.map((day, i) => (
                <DayCard key={`${day.dayNumber}-${day.location}`} day={day} index={i} />
              ))}
            </div>

            {/* Highlights + packing */}
            <div className={styles.bottomGrid}>
              <div className={styles.highlightsBox}>
                <h5 className={styles.boxTitle}>
                  <Sparkles size={13} /> Destination Highlights
                </h5>
                <ul className={styles.highlightList}>
                  {plan.highlights.map((h, i) => (
                    <li key={i} className={styles.highlightItem}>
                      <span className={styles.highlightDot} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.packingBox}>
                <h5 className={styles.boxTitle}>
                  <Home size={13} /> Packing Essentials
                </h5>
                <ul className={styles.packingList}>
                  {plan.packingList.map((item, i) => (
                    <li key={i} className={styles.packingItem}>
                      <span className={styles.packingCheck}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Budget breakdown */}
            <div className={styles.budgetRow}>
              <div className={styles.budgetCard}>
                <span className={styles.budgetTier}>Budget</span>
                <span className={styles.budgetAmount}>{plan.budget.low}</span>
              </div>
              <div className={`${styles.budgetCard} ${styles.budgetCardMid}`}>
                <span className={styles.budgetTier}>Mid-range</span>
                <span className={styles.budgetAmount}>{plan.budget.mid}</span>
              </div>
              <div className={styles.budgetCard}>
                <span className={styles.budgetTier}>Luxury</span>
                <span className={styles.budgetAmount}>{plan.budget.high}</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
