'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Eye, Utensils, Home, Sparkles, MapPin, Compass,
  Hotel, Beer, List, Loader2, Search, ExternalLink, Radio
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { type PlaceRecommendation } from '@/lib/slRecommendations';
import citiesDataRaw from '@/data/cities.json';
import styles from './LocalGuideModal.module.css';

const citiesData = citiesDataRaw as Record<string, { id: string, name: string, cities: { id: string, name: string, lat: number, lon: number }[] }[]>;

export interface LocalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber: number;
  location: string;
  placesToWatch: PlaceRecommendation[];
  placesToEat: PlaceRecommendation[];
  placesToStay: PlaceRecommendation[];
}

const LOCATION_COORDS: Record<string, { lat: number; lon: number }> = {
  colombo: { lat: 6.9271, lon: 79.8612 },
  galle: { lat: 6.0267, lon: 80.2111 },
  yala: { lat: 6.3762, lon: 81.5198 },
  ella: { lat: 6.8667, lon: 81.0466 },
  sigiriya: { lat: 7.9570, lon: 80.7603 },
  kandy: { lat: 7.2936, lon: 80.6413 },
  'nuwara eliya': { lat: 6.9647, lon: 80.7818 },
  mirissa: { lat: 5.9482, lon: 80.4514 },
  negombo: { lat: 7.2088, lon: 79.8358 },
  anuradhapura: { lat: 8.3114, lon: 80.4037 },
  trincomalee: { lat: 8.5874, lon: 81.2152 },
  jaffna: { lat: 9.6615, lon: 80.0255 },
  polonnaruwa: { lat: 7.9403, lon: 81.0188 },
  dambulla: { lat: 7.8578, lon: 80.6525 },
  matara: { lat: 5.9549, lon: 80.5550 },
  tangalle: { lat: 6.0244, lon: 80.7941 },
  arugambay: { lat: 6.8398, lon: 81.8296 },
  bentota: { lat: 6.4214, lon: 80.0044 },
  unawatuna: { lat: 6.0113, lon: 80.2472 },
  hikkaduwa: { lat: 6.1396, lon: 80.1009 },
  weligama: { lat: 5.9740, lon: 80.4290 },
  ahungalla: { lat: 5.8356, lon: 80.3185 },
  beruwala: { lat: 6.4788, lon: 79.9828 },
  kalpitiya: { lat: 8.2295, lon: 79.7596 },
  pasikudah: { lat: 7.9255, lon: 81.5645 },
  batticaloa: { lat: 7.7310, lon: 81.6748 },
  udawalawe: { lat: 6.4746, lon: 80.8988 },
  sinharaja: { lat: 6.4173, lon: 80.4131 },
  pinnawala: { lat: 7.3015, lon: 80.3872 },
  kataragama: { lat: 6.4152, lon: 81.3323 },
  bandarawela: { lat: 6.8313, lon: 80.9980 },
  haputale: { lat: 6.7681, lon: 80.9576 },
  kitulgala: { lat: 6.9889, lon: 80.4116 },
  hatton: { lat: 6.8913, lon: 80.5983 },
  matale: { lat: 7.4675, lon: 80.6234 },
  kurunegala: { lat: 7.4863, lon: 80.3623 },
  ratnapura: { lat: 6.7056, lon: 80.3847 },
  hambantota: { lat: 6.1248, lon: 81.1185 },
  mannar: { lat: 8.9810, lon: 79.9044 },
  vavuniya: { lat: 8.7514, lon: 80.4971 },
  wilpattu: { lat: 8.4485, lon: 80.0384 },
  habarana: { lat: 8.0362, lon: 80.7523 },
};

function getLocationCoords(locationName: string): { lat: number; lon: number } {
  const cleaned = locationName
    .replace(/^(start:|stop \d+:|day \d+:)/i, '')
    .replace(/\(.*?\)/g, '')
    .toLowerCase()
    .trim();

  // 1. Check direct popular tourist dictionary first
  if (LOCATION_COORDS[cleaned]) return LOCATION_COORDS[cleaned];
  for (const [key, coords] of Object.entries(LOCATION_COORDS)) {
    if (cleaned.includes(key) || key.includes(cleaned.split(' ')[0])) {
      return coords;
    }
  }

  // 2. Search cities.json across all provinces and districts in Sri Lanka
  for (const provinceList of Object.values(citiesData)) {
    for (const district of provinceList) {
      for (const city of district.cities) {
        const cityNameLower = city.name.toLowerCase().trim();
        if (
          cityNameLower === cleaned ||
          cleaned.includes(cityNameLower) ||
          cityNameLower.includes(cleaned)
        ) {
          return { lat: city.lat, lon: city.lon };
        }
      }
    }
  }

  // 3. Fallback center of Sri Lanka
  return { lat: 7.8731, lon: 80.7718 };
}

const LIVE_FILTERS = [
  { id: 'all', label: 'All Nearby', icon: List, tags: [] },
  { id: 'hotels', label: 'Hotels', icon: Hotel, tags: ['hotel', 'resort'] },
  { id: 'inns', label: 'Inns & More', icon: Home, tags: ['guest_house', 'hostel', 'apartment', 'chalet', 'motel', 'camp_site'] },
  { id: 'restaurants', label: 'Restaurants', icon: Utensils, tags: ['restaurant', 'food_court'] },
  { id: 'pubs', label: 'Pubs & Cafes', icon: Beer, tags: ['pub', 'bar', 'cafe', 'fast_food'] },
];

function matchesCategoryFilter(p: any, filterId: string): boolean {
  if (filterId === 'all') return true;
  const tourism = (p.tags?.tourism || '').toLowerCase();
  const amenity = (p.tags?.amenity || '').toLowerCase();
  const name = (p.tags?.name || p.tags?.['name:en'] || '').toLowerCase();

  if (filterId === 'hotels') {
    return (
      tourism === 'hotel' ||
      tourism === 'resort' ||
      name.includes('hotel') ||
      name.includes('resort')
    );
  }
  if (filterId === 'inns') {
    return (
      tourism === 'guest_house' ||
      tourism === 'hostel' ||
      tourism === 'apartment' ||
      tourism === 'chalet' ||
      tourism === 'motel' ||
      tourism === 'camp_site' ||
      name.includes('villa') ||
      name.includes('guest house') ||
      name.includes('homestay') ||
      name.includes('inn') ||
      name.includes('lodge') ||
      name.includes('cottage')
    );
  }
  if (filterId === 'restaurants') {
    return (
      amenity === 'restaurant' ||
      amenity === 'food_court' ||
      name.includes('restaurant') ||
      name.includes('dining') ||
      name.includes('eatery')
    );
  }
  if (filterId === 'pubs') {
    return (
      amenity === 'pub' ||
      amenity === 'bar' ||
      amenity === 'cafe' ||
      amenity === 'fast_food' ||
      name.includes('cafe') ||
      name.includes('pub') ||
      name.includes('bar') ||
      name.includes('coffee')
    );
  }
  return true;
}

const fetchNearbyData = async (lat: number, lon: number): Promise<any[]> => {
  const query = `
    [out:json][timeout:15];
    (
      nwr["tourism"~"hotel|guest_house|resort|hostel|apartment|chalet|motel|camp_site"](around:10000, ${lat}, ${lon});
      nwr["amenity"~"restaurant|cafe|fast_food|bar|food_court|pub"](around:10000, ${lat}, ${lon});
    );
    out center 400;
  `;
  const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
  const json = await res.json();
  return (json.elements || []).filter((e: any) => e.tags && (e.tags.name || e.tags['name:en']));
};

export default function LocalGuideModal({
  isOpen,
  onClose,
  dayNumber,
  location,
  placesToWatch = [],
  placesToEat = [],
  placesToStay = [],
}: LocalGuideModalProps) {
  // Mode switcher: 'live' (Overpass API nearby POIs) or 'curated' (15 luxury highlights)
  const [mode, setMode] = useState<'live' | 'curated'>('live');

  // Curated tabs
  const [curatedTab, setCuratedTab] = useState<'watch' | 'eat' | 'stay'>('watch');

  // Live Nearby states (just like ProvincialExplorer)
  const [liveFilter, setLiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMainPoint, setSelectedMainPoint] = useState<PlaceRecommendation | null>(null);

  useEffect(() => {
    if (isOpen && placesToWatch && placesToWatch.length > 0 && !selectedMainPoint) {
      setSelectedMainPoint(placesToWatch[0]);
    }
  }, [isOpen, placesToWatch, selectedMainPoint]);

  const { lat: baseLat, lon: baseLon } = useMemo(() => getLocationCoords(location), [location]);

  const { lat, lon } = useMemo(() => {
    if (!selectedMainPoint) return { lat: baseLat, lon: baseLon };
    const idx = placesToWatch.findIndex((p) => p.id === selectedMainPoint.id);
    if (idx <= 0) return { lat: baseLat, lon: baseLon };
    const offsetLat = (idx % 2 === 0 ? 1 : -1) * 0.0045 * Math.ceil(idx / 2);
    const offsetLon = (idx % 2 === 0 ? -1 : 1) * 0.0045 * Math.ceil(idx / 2);
    return { lat: baseLat + offsetLat, lon: baseLon + offsetLon };
  }, [baseLat, baseLon, selectedMainPoint, placesToWatch]);

  // Support ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Fetch live OSM Overpass data when modal is open and mode === 'live'
  const { data: poiData, isLoading: isLiveLoading } = useQuery({
    queryKey: ['nearbyPOIsModal', lat, lon],
    queryFn: () => fetchNearbyData(lat, lon),
    enabled: isOpen && mode === 'live',
    staleTime: 5 * 60 * 1000,
  });

  // Filtered live POIs
  const filteredPOIs = useMemo(() => {
    if (!poiData) return [];
    let list = poiData;
    if (liveFilter !== 'all') {
      list = poiData.filter((p: any) => matchesCategoryFilter(p, liveFilter));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p: any) => {
        const name = p.tags.name || p.tags['name:en'] || '';
        return name.toLowerCase().includes(q);
      });
    }
    return list;
  }, [poiData, liveFilter, searchQuery]);

  const activeCuratedList =
    curatedTab === 'watch'
      ? placesToWatch
      : curatedTab === 'eat'
      ? placesToEat
      : placesToStay;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <span className={styles.dayBadge}>Day {dayNumber} · {location}</span>
                <h3 className={styles.title}>Explore {location}: Hotels, Dining & Attractions</h3>
                <p className={styles.subtitle}>
                  Discover live nearby hotels, inns, pubs & restaurants within 10km via OpenStreetMap, or browse our curated highlights
                </p>
              </div>
              <button
                onClick={onClose}
                className={styles.closeBtn}
                title="Close Guide (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mode Switcher Bar */}
            <div className={styles.modeBar}>
              <button
                onClick={() => setMode('live')}
                className={`${styles.modeBtn} ${mode === 'live' ? styles.modeBtnActive : ''}`}
              >
                <Radio size={15} />
                <span>📡 Live Nearby Explorer (OSM Overpass)</span>
              </button>
              <button
                onClick={() => setMode('curated')}
                className={`${styles.modeBtn} ${mode === 'curated' ? styles.modeBtnActive : ''}`}
              >
                <Sparkles size={15} />
                <span>✦ Curated Luxury Highlights ({placesToWatch.length + placesToEat.length + placesToStay.length})</span>
              </button>
            </div>

            {/* ── Mode 1: Live Nearby Overpass API Explorer (ProvincialExplorer style) ── */}
            {mode === 'live' ? (
              <>
                <div className={styles.filterBar}>
                  <div className={styles.filterTabs}>
                    {LIVE_FILTERS.map((f) => {
                      const Icon = f.icon;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setLiveFilter(f.id)}
                          className={`${styles.filterBtn} ${
                            liveFilter === f.id ? styles.filterBtnActive : ''
                          }`}
                        >
                          <Icon size={14} />
                          <span>{f.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className={styles.searchBox}>
                    <Search size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
                    <input
                      type="text"
                      className={styles.searchInput}
                      placeholder={`Search places around ${location}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.body}>
                  {/* ── Section 1: Places You Can Visit in {location} (Landmark Selector) ── */}
                  {placesToWatch && placesToWatch.length > 0 && (
                    <div className={styles.mainPointSection}>
                      <div className={styles.mainPointHeader}>
                        <div className={styles.mainPointTitle}>
                          <Compass size={16} className={styles.nearTitleGold} />
                          <span>Places You Can Visit in {location}</span>
                        </div>
                        <span className={styles.mainPointSub}>
                          Select an attraction below to set it as your Main Point & explore live hotels, inns, pubs & dining near it
                        </span>
                      </div>
                      <div className={styles.mainPointGrid}>
                        {placesToWatch.map((place) => {
                          const isActive = selectedMainPoint?.id === place.id;
                          return (
                            <div
                              key={place.id}
                              onClick={() => setSelectedMainPoint(place)}
                              className={`${styles.mainPointCard} ${isActive ? styles.mainPointCardActive : ''}`}
                            >
                              <div className={styles.mainPointTop}>
                                <span className={styles.mainPointTag}>{place.tag}</span>
                                <h4 className={styles.mainPointName}>{place.name}</h4>
                                <p className={styles.mainPointDesc}>{place.desc}</p>
                              </div>
                              <button className={styles.mainPointBtn}>
                                <MapPin size={13} />
                                <span>{isActive ? '📍 Active Main Point ✓' : '📍 Select as Main Point'}</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── Section 2: Live Nearby Places around Main Point ── */}
                  <div className={styles.nearHeader}>
                    <div className={styles.nearTitle}>
                      <span>Live Hotels, Inns, Pubs & Dining Near</span>
                      <span className={styles.nearTitleGold}>
                        "{selectedMainPoint ? selectedMainPoint.name : location}"
                      </span>
                      <span style={{ fontSize: '0.8rem', opacity: 0.6, fontWeight: 400 }}>
                        (within 10km OSM Overpass)
                      </span>
                    </div>
                  </div>
                  {isLiveLoading ? (
                    <div className={styles.loadingBox}>
                      <Loader2 size={36} className="animate-spin" />
                      <span>Fetching live hotels, inns, pubs & dining around {location} via Overpass API...</span>
                    </div>
                  ) : filteredPOIs.length === 0 ? (
                    <div className={styles.emptyBox}>
                      <MapPin size={32} style={{ opacity: 0.4 }} />
                      <span>No nearby places found matching your filter within 10km of {location}.</span>
                    </div>
                  ) : (
                    <div className={styles.grid}>
                      {filteredPOIs.map((poi: any) => {
                        let PoiIcon = Hotel;
                        if (poi.tags.amenity) {
                          if (['pub', 'bar', 'cafe', 'fast_food'].includes(poi.tags.amenity)) PoiIcon = Beer;
                          else PoiIcon = Utensils;
                        } else if (poi.tags.tourism) {
                          if (['guest_house', 'hostel', 'apartment', 'chalet', 'motel', 'camp_site'].includes(poi.tags.tourism)) PoiIcon = Home;
                          else PoiIcon = Hotel;
                        }

                        const poiLat = poi.lat || poi.center?.lat || lat;
                        const poiLon = poi.lon || poi.center?.lon || lon;
                        const typeLabel =
                          poi.tags.tourism?.replace('_', ' ') ||
                          poi.tags.amenity?.replace('_', ' ') ||
                          'place';

                        return (
                          <motion.div
                            key={poi.id}
                            className={styles.poiCard}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className={styles.poiHeader}>
                              <div className={styles.poiIcon}>
                                <PoiIcon size={22} />
                              </div>
                              <div className={styles.poiInfo}>
                                <h4 className={styles.poiName}>
                                  {poi.tags.name || poi.tags['name:en']}
                                </h4>
                                <span className={styles.poiType}>{typeLabel}</span>
                              </div>
                            </div>

                            <div className={styles.poiActionRow}>
                              <span className={styles.poiMeta}>
                                <MapPin size={12} />
                                {poiLat.toFixed(3)}° N, {poiLon.toFixed(3)}° E
                              </span>
                              <a
                                href={`https://maps.google.com/maps?q=${poiLat},${poiLon}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.mapLinkBtn}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink size={12} />
                                <span>Google Maps ↗</span>
                              </a>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* ── Mode 2: Curated Highlights ── */
              <>
                <div className={styles.tabsBar}>
                  <button
                    onClick={() => setCuratedTab('watch')}
                    className={`${styles.tabBtn} ${curatedTab === 'watch' ? styles.tabBtnActive : ''}`}
                  >
                    <Eye size={16} />
                    <span>Places to Watch & Visit</span>
                    <span className={styles.tabBadge}>{placesToWatch.length}</span>
                  </button>
                  <button
                    onClick={() => setCuratedTab('eat')}
                    className={`${styles.tabBtn} ${curatedTab === 'eat' ? styles.tabBtnActive : ''}`}
                  >
                    <Utensils size={16} />
                    <span>Food, Dine & Restaurants</span>
                    <span className={styles.tabBadge}>{placesToEat.length}</span>
                  </button>
                  <button
                    onClick={() => setCuratedTab('stay')}
                    className={`${styles.tabBtn} ${curatedTab === 'stay' ? styles.tabBtnActive : ''}`}
                  >
                    <Home size={16} />
                    <span>Stay, Resorts & Hotels</span>
                    <span className={styles.tabBadge}>{placesToStay.length}</span>
                  </button>
                </div>

                <div className={styles.body}>
                  <div className={styles.grid}>
                    {activeCuratedList.map((item) => (
                      <motion.div
                        key={item.id}
                        className={styles.card}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div>
                          <div className={styles.cardHeader}>
                            <h4 className={styles.cardName}>{item.name}</h4>
                            <span className={styles.cardTag}>{item.tag}</span>
                          </div>
                          <p className={styles.cardDesc}>{item.desc}</p>
                        </div>
                        {item.highlight && (
                          <div className={styles.cardHighlight}>
                            <Sparkles size={14} />
                            <span>{item.highlight}</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
