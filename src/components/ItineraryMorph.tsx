'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ItineraryMorph.module.css';

// Dynamic import with no SSR to bypass leaflet issues
const MapClient = dynamic(() => import('./MapClient'), {
    ssr: false,
    loading: () => <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e0e0e0' }}>Loading Map...</div>
});

const locations = [
    {
        id: 'colombo',
        day: 'Day 1',
        name: 'Colombo Arrival',
        desc: 'Touch down at Bandaranaike International Airport. Settle into your luxury suite and enjoy a sunset cocktail overlooking the Indian Ocean.',
        coords: [6.927079, 79.861244] as [number, number],
        zoom: 12
    },
    {
        id: 'galle',
        day: 'Day 2-3',
        name: 'Galle Coastal Charm',
        desc: 'Travel south to the UNESCO-listed Galle Fort. Wander through cobblestone streets lined with boutiques, cafes, and colonial architecture. Relax on Unawatuna beach.',
        coords: [6.032813, 80.216796] as [number, number],
        zoom: 13
    },
    {
        id: 'yala',
        day: 'Day 4-5',
        name: 'Yala Safari',
        desc: 'Embark on an exhilarating wildlife safari in Yala National Park. Spot elusive leopards, majestic elephants, and diverse birdlife in their natural habitat.',
        coords: [6.381282, 81.362145] as [number, number],
        zoom: 11
    },
    {
        id: 'ella',
        day: 'Day 6-7',
        name: 'Ella & Nine Arches',
        desc: 'Ascend into the mist-shrouded hills. Take the scenic train to Ella, hike Little Adam\'s Peak, and marvel at the engineering of the Nine Arches Bridge.',
        coords: [6.866698, 81.046614] as [number, number],
        zoom: 13
    },
    {
        id: 'sigiriya',
        day: 'Day 8-10',
        name: 'Cultural Triangle',
        desc: 'Explore the ancient rock fortress of Sigiriya, a masterpiece of ancient engineering. Conclude with a luxurious stay amidst ancient kingdoms before departure.',
        coords: [7.954108, 80.760269] as [number, number],
        zoom: 13
    }
];

export default function ItineraryMorph() {
    const [activeId, setActiveId] = useState(locations[0].id);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const cards = document.querySelectorAll('.itinerary-card');
            let currentActiveId = locations[0].id;

            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                // Trigger activation when the card hits a specific threshold (e.g., middle of viewport)
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    const id = card.getAttribute('data-id');
                    if (id) currentActiveId = id;
                }
            });

            setActiveId(currentActiveId);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="section" id="itinerary">
            <h2 className="section-title">The "Best in Class" AI Itinerary</h2>
            <div className={styles.itinerarySection} ref={containerRef}>

                <div className={styles.timeline}>
                    {locations.map((loc, ind) => (
                        <div
                            key={loc.id}
                            data-id={loc.id}
                            className={`itinerary-card ${styles.dayCard} ${activeId === loc.id ? styles.active : ''}`}
                        >
                            <div className={styles.dayNumber}>{loc.day}</div>
                            <h3 className={styles.dayTitle}>{loc.name}</h3>
                            <p className={styles.dayDesc}>{loc.desc}</p>
                        </div>
                    ))}
                </div>

                <div className={styles.mapContainer}>
                    <MapClient locations={locations} activeLocationId={activeId} />
                </div>
            </div>
        </div>
    );
}
