const fs = require('fs');
const path = require('path');

const places = JSON.parse(fs.readFileSync('expanded_places.json', 'utf8'));

// Curated Unsplash IDs for Provinces to avoid the "Ella" overlap
const PROVINCE_IMAGES = {
    'central': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800',
    'southern': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800',
    'western': 'https://images.unsplash.com/photo-1544814980-0ad5bdcfc2c6?q=80&w=800',
    'eastern': 'https://images.unsplash.com/photo-1598425264353-83f60f6de9ca?q=80&w=800',
    'north-central': 'https://images.unsplash.com/photo-1565406086782-b7e28bfaf2bd?q=80&w=800',
    'uva': 'https://images.unsplash.com/photo-1574580396417-ebcc41d77292?q=80&w=800',
    'northern': 'https://images.unsplash.com/photo-1596162954151-cdcb92b6eb26?q=80&w=800',
    'north-western': 'https://images.unsplash.com/photo-1574611122955-5baa61496637?q=80&w=800',
    'sabaragamuwa': 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?q=80&w=800'
};

const content = `'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, Hotel, Utensils, Loader2, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import styles from './ProvincialExplorer.module.css';

interface Place {
    id: string;
    name: string;
    desc: string;
    lat: number;
    lon: number;
    img: string;
}

interface Province {
    id: string;
    name: string;
    image: string;
}

const PROVINCES: Province[] = [
    { id: 'central', name: 'Central', image: '${PROVINCE_IMAGES['central']}' },
    { id: 'southern', name: 'Southern', image: '${PROVINCE_IMAGES['southern']}' },
    { id: 'western', name: 'Western', image: '${PROVINCE_IMAGES['western']}' },
    { id: 'eastern', name: 'Eastern', image: '${PROVINCE_IMAGES['eastern']}' },
    { id: 'north-central', name: 'North Central', image: '${PROVINCE_IMAGES['north-central']}' },
    { id: 'uva', name: 'Uva', image: '${PROVINCE_IMAGES['uva']}' },
    { id: 'northern', name: 'Northern', image: '${PROVINCE_IMAGES['northern']}' },
    { id: 'north-western', name: 'North Western', image: '${PROVINCE_IMAGES['north-western']}' },
    { id: 'sabaragamuwa', name: 'Sabaragamuwa', image: '${PROVINCE_IMAGES['sabaragamuwa']}' }
];

const PLACES: Record<string, Place[]> = ` + JSON.stringify(places, null, 4) + `;

const fetchNearbyData = async (lat: number, lon: number) => {
    const query = \`
    [out:json];
    (
      nwr["tourism"~"hotel|guest_house|resort|hostel"](around:5000, \${lat}, \${lon});
      nwr["amenity"~"restaurant|cafe|fast_food|bar"](around:5000, \${lat}, \${lon});
    );
    out center 40;
  \`;
    const res = await fetch(\`https://overpass-api.de/api/interpreter?data=\${encodeURIComponent(query)}\`);
    const json = await res.json();
    return json.elements.filter((e: any) => e.tags && (e.tags.name || e.tags["name:en"]));
};

export default function ProvincialExplorer() {
    const [selectedProv, setSelectedProv] = useState<string | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [tab, setTab] = useState('hotels');
    const [showAllPlaces, setShowAllPlaces] = useState(false);

    const { data: poiData, isLoading } = useQuery({
        queryKey: ['nearbyPOIs', selectedPlace?.id],
        queryFn: () => fetchNearbyData(selectedPlace!.lat, selectedPlace!.lon),
        enabled: !!selectedPlace,
        staleTime: 5 * 60 * 1000
    });

    const handleProvinceSelect = (id: string) => {
        setSelectedProv(id);
        const provincePlaces = PLACES[id] || [];
        setSelectedPlace(provincePlaces[0] || null);
        setShowAllPlaces(false);
    };

    const handleBack = () => {
        setSelectedProv(null);
        setSelectedPlace(null);
    };

    const hotels = poiData?.filter((p: any) => p.tags.tourism) || [];
    const restaurants = poiData?.filter((p: any) => p.tags.amenity) || [];

    return (
        <div className={\`section \${styles.container}\`} id="map">
            <div className={styles.intro}>
                <h2 className={styles.title}>Provincial Explorer</h2>
                <p className={styles.subtitle}>Navigate Sri Lanka by province and uncover nearby luxury stays and dining via live maps data.</p>
            </div>

            <AnimatePresence mode="wait">
                {!selectedProv ? (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={styles.provinceGrid}
                    >
                        {PROVINCES.map(prov => (
                            <motion.div
                                key={prov.id}
                                className={styles.provinceCard}
                                whileHover={{ y: -5 }}
                                onClick={() => handleProvinceSelect(prov.id)}
                            >
                                <img src={prov.image} alt={prov.name} className={styles.provinceImg} />
                                <div className={styles.provinceOverlay}>
                                    <h3 className={styles.provinceName}>{prov.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="places"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={styles.placesContainer}
                    >
                        <button className={styles.backBtn} onClick={handleBack}>
                            <ChevronLeft size={20} /> Back to Provinces
                        </button>

                        <div className={styles.placesLayout}>
                            <div className={styles.placesList}>
                                <h3 className={styles.title} style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>
                                    Famous Places in {PROVINCES.find(p => p.id === selectedProv)?.name}
                                </h3>
                                {PLACES[selectedProv]?.slice(0, showAllPlaces ? 20 : 4).map(place => (
                                    <motion.div
                                        key={place.id}
                                        className={\`\${styles.placeCard} \${selectedPlace?.id === place.id ? styles.placeCardActive : ''}\`}
                                        onClick={() => setSelectedPlace(place)}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <img src={place.img} alt={place.name} className={styles.placeImg} />
                                        <div className={styles.placeContent}>
                                            <h4 className={styles.placeTitle}>{place.name}</h4>
                                            <p className={styles.placeDesc}>{place.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                                {PLACES[selectedProv]?.length > 4 && !showAllPlaces && (
                                    <button 
                                        className={styles.showMoreBtn} 
                                        onClick={() => setShowAllPlaces(true)}
                                    >
                                        Show More (+{PLACES[selectedProv]?.length - 4})
                                    </button>
                                )}
                            </div>

                            <div className={styles.dataView}>
                                <div className={styles.dataHeader}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <h4 className={styles.dataTitle}>Near {selectedPlace?.name}</h4>
                                        <a 
                                            href={\`https://www.google.com/maps/search/?api=1&query=\${selectedPlace?.lat},\${selectedPlace?.lon}\`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.mapLink}
                                        >
                                            <ExternalLink size={16} /> Map
                                        </a>
                                    </div>
                                    <div className={styles.dataTabs}>
                                        <button
                                            className={\`\${styles.tab} \${tab === 'hotels' ? styles.tabActive : ''}\`}
                                            onClick={() => setTab('hotels')}
                                        >
                                            <Hotel size={16} style={{ display: 'inline', marginRight: '6px' }} /> Hotels
                                        </button>
                                        <button
                                            className={\`\${styles.tab} \${tab === 'restaurants' ? styles.tabActive : ''}\`}
                                            onClick={() => setTab('restaurants')}
                                        >
                                            <Utensils size={16} style={{ display: 'inline', marginRight: '6px' }} /> Dining
                                        </button>
                                    </div>
                                </div>

                                {isLoading ? (
                                    <div className={styles.loadingState}>
                                        <Loader2 size={40} className="animate-spin" />
                                        <p>Consulting Live Maps...</p>
                                    </div>
                                ) : (
                                    <div className={styles.poiList}>
                                        {tab === 'hotels' && hotels.length === 0 && (
                                            <div className={styles.emptyState}>No hotels found within 5km of this area.</div>
                                        )}
                                        {tab === 'restaurants' && restaurants.length === 0 && (
                                            <div className={styles.emptyState}>No restaurants found within 5km.</div>
                                        )}

                                        {(tab === 'hotels' ? hotels : restaurants).map((poi: any) => (
                                            <motion.div
                                                key={poi.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={styles.poiCard}
                                            >
                                                <div className={styles.poiIcon}>
                                                    {tab === 'hotels' ? <Hotel size={24} /> : <Utensils size={24} />}
                                                </div>
                                                <div className={styles.poiInfo}>
                                                    <h5>{poi.tags.name || poi.tags["name:en"]}</h5>
                                                    <p><MapPin size={12} style={{ display: 'inline' }} /> {poi.tags["addr:street"] || "Live Ground Hub"}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
\`;

fs.writeFileSync('src/components/ProvincialExplorer.tsx', content);
console.log('ProvincialExplorer.tsx finalized with corrected template strings, map links, and massive dataset.');
