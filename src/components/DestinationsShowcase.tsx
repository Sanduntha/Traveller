'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Coffee, Wifi, Home } from 'lucide-react';
import styles from './DestinationsShowcase.module.css';

const destinationData = [
    {
        category: 'wildlife',
        title: 'Wildlife Excursions',
        desc: 'From elusive leopards to gentle giants in their natural habitats.',
        places: [
            { name: 'Yala National Park', img: 'https://images.unsplash.com/photo-1574611122955-5baa61496637?q=80&w=1000&auto=format&fit=crop', desc: 'Highest leopard density in the world.' },
            { name: 'Udawalawe', img: 'https://images.unsplash.com/photo-1578519050142-afb511e518de?q=80&w=1000&auto=format&fit=crop', desc: 'Renowned for large elephant herds.' }
        ],
        hotels: [
            { name: 'Wild Coast Tented Lodge', location: 'Yala', rating: 4.9, img: 'https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?q=80&w=1000&auto=format&fit=crop' },
            { name: 'Chena Huts by Uga', location: 'Yala', rating: 4.8, img: 'https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?q=80&w=1000&auto=format&fit=crop' }
        ]
    },
    {
        category: 'beaches',
        title: 'Azure Beaches',
        desc: 'Pristine coastline, surf breaks, and golden shorelines.',
        places: [
            { name: 'Mirissa', img: 'https://images.unsplash.com/photo-1651264042769-ef84e30f4ac8?q=80&w=1000&auto=format&fit=crop', desc: 'Famous for whale watching and sunsets.' },
            { name: 'Arugam Bay', img: 'https://images.unsplash.com/photo-1569670380685-4582bf29a24a?q=80&w=1000&auto=format&fit=crop', desc: 'Surfers paradise on the east coast.' }
        ],
        hotels: [
            { name: 'Cape Weligama', location: 'Weligama', rating: 5.0, img: 'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?q=80&w=1000&auto=format&fit=crop' },
            { name: 'Anantara Peace Haven', location: 'Tangalle', rating: 4.9, img: 'https://images.unsplash.com/photo-1624963145721-277432579507?q=80&w=1000&auto=format&fit=crop' }
        ]
    },
    {
        category: 'culture',
        title: 'Ancient Kingdoms',
        desc: 'Unearth centuries of Buddhist heritage and grand architecture.',
        places: [
            { name: 'Sigiriya Rock Fortress', img: 'https://images.unsplash.com/photo-1609681980718-340e7f4b11d7?q=80&w=1000&auto=format&fit=crop', desc: 'An ancient palace carved into a rock.' },
            { name: 'Temple of the Tooth', img: 'https://images.unsplash.com/photo-1707236606614-fbee3070f156?q=80&w=1000&auto=format&fit=crop', desc: 'Sacred Buddhist temple in Kandy.' }
        ],
        hotels: [
            { name: 'Water Garden Sigiriya', location: 'Sigiriya', rating: 4.8, img: 'https://images.unsplash.com/photo-1533484482814-3fe2d922be89?q=80&w=1000&auto=format&fit=crop' },
            { name: 'The Kandy House', location: 'Kandy', rating: 4.7, img: 'https://images.unsplash.com/photo-1621393614326-2f9ed389ce02?q=80&w=1000&auto=format&fit=crop' }
        ]
    },
    {
        category: 'gems',
        title: 'Hidden Gems',
        desc: 'Untouched locations away from the tourist trails.',
        places: [
            { name: 'Knuckles Mountain Range', img: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?q=80&w=1000&auto=format&fit=crop', desc: 'Biodiversity hotspot perfect for trekking.' },
            { name: 'Horton Plains', img: 'https://images.unsplash.com/photo-1612862862126-865765df2ded?q=80&w=1000&auto=format&fit=crop', desc: 'Cloud forests and the famous World’s End precipice.' }
        ],
        hotels: [
            { name: 'Santani Wellness Resort', location: 'Kandy Mountains', rating: 4.9, img: 'https://images.unsplash.com/photo-1580910527739-556eb89f9d65?q=80&w=1000&auto=format&fit=crop' },
            { name: 'Ceylon Tea Trails', location: 'Hatton', rating: 5.0, img: 'https://images.unsplash.com/photo-1574611122955-5baa61496637?q=80&w=1000&auto=format&fit=crop' }
        ]
    }
];

export default function DestinationsShowcase() {
    return (
        <div className="section">
            <h2 className="section-title">Famous Destinations & Stays</h2>

            {destinationData.map((section, idx) => (
                <section key={section.category} id={section.category} className={styles.categorySection}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>{section.title}</h3>
                        <p className={styles.desc}>{section.desc}</p>
                    </div>

                    <div className={styles.grid}>
                        {/* Places */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}><MapPin size={20} /> Most Famous Places</h4>
                            <div className={styles.cards}>
                                {section.places.map((place) => (
                                    <motion.div
                                        key={place.name}
                                        className={styles.card}
                                        whileHover={{ y: -5 }}
                                    >
                                        <img src={place.img} alt={place.name} className={styles.cardImg} />
                                        <div className={styles.cardContent}>
                                            <h5 className={styles.cardTitle}>{place.name}</h5>
                                            <p className={styles.cardDesc}>{place.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Hotels */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}><Home size={20} /> Nearby Luxury Hotels</h4>
                            <div className={styles.cards}>
                                {section.hotels.map((hotel) => (
                                    <motion.div
                                        key={hotel.name}
                                        className={styles.card}
                                        whileHover={{ y: -5 }}
                                    >
                                        <img src={hotel.img} alt={hotel.name} className={styles.cardImg} />
                                        <div className={styles.cardContent}>
                                            <div className={styles.hotelHeader}>
                                                <h5 className={styles.cardTitle}>{hotel.name}</h5>
                                                <span className={styles.rating}><Star size={14} fill="currentColor" /> {hotel.rating}</span>
                                            </div>
                                            <p className={styles.cardDesc}>{hotel.location}</p>
                                            <div className={styles.amenities}>
                                                <Wifi size={14} /> <Coffee size={14} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
}
