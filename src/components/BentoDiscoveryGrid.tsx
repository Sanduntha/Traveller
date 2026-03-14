'use client';

import { motion } from 'framer-motion';
import { CloudRain, Anchor, MapPin, Sparkles } from 'lucide-react';
import styles from './BentoDiscoveryGrid.module.css';

export default function BentoDiscoveryGrid() {
    return (
        <div className="section" id="discovery">
            <motion.div
                className={styles.bentoContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                    }
                }}
            >
                {/* TILE 1: Historic Hero (2x2) */}
                <motion.div
                    className={`${styles.bentoCard} ${styles.tile1}`}
                    variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } } }}
                    whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
                    layoutId="bento-tile-1"
                >
                    <img src="https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?q=80&w=2000&auto=format&fit=crop" alt="Sigiriya" className={styles.coverImg} />
                    <div className={styles.overlay}>
                        <div className={styles.aiTag}>
                            <Sparkles size={14} className="text-gold" /> AI Summary
                        </div>
                        <div className={styles.contentBottom}>
                            <h3 className={styles.title}>The Cultural Triangle</h3>
                            <p className={styles.desc}>Ancient monoliths crafted 1500 years ago.</p>
                        </div>
                    </div>
                </motion.div>

                {/* TILE 2: Live Data Pulse (1x1) */}
                <motion.div
                    className={`${styles.bentoCard} ${styles.tile2}`}
                    variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } } }}
                    whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
                    layoutId="bento-tile-2"
                >
                    <div className={styles.glassInner}>
                        <div className={styles.pulseHeader}>
                            <h4 className={styles.smallTitle}>Current Island Pulse</h4>
                            <div className={styles.liveDot}></div>
                        </div>
                        <div className={styles.pulseWidgets}>
                            <div className={styles.widget}>
                                <div className={styles.widgetTop}><MapPin size={14} /> Mirissa</div>
                                <div className={styles.widgetData}><Anchor size={18} /> 4ft Swell</div>
                            </div>
                            <div className={styles.widget}>
                                <div className={styles.widgetTop}><MapPin size={14} /> Arugam Bay</div>
                                <div className={styles.widgetData}><CloudRain size={18} /> 28°C Clear</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* TILE 3: Featured Stay (2x1) */}
                <motion.div
                    className={`${styles.bentoCard} ${styles.tile3}`}
                    variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } } }}
                    whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
                    layoutId="bento-tile-3"
                >
                    <img src="https://images.unsplash.com/photo-1612862862126-865765df2ded?q=80&w=1200&auto=format&fit=crop" alt="Luxury Stay" className={styles.coverImg} />
                    <div className={styles.overlayBottomFixed}>
                        <div>
                            <h4 className={styles.mediumTitle}>Geoffrey Bawa's Legacy</h4>
                            <p className={styles.subtext}>Kandalama • Tropical Modernism</p>
                        </div>
                        <button className={styles.glassButton}>Reserve Stay</button>
                    </div>
                </motion.div>

                {/* TILE 4: Interactive Altitude (1x1) */}
                <motion.div
                    className={`${styles.bentoCard} ${styles.tile4}`}
                    variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } } }}
                    whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }}
                    layoutId="bento-tile-4"
                >
                    <img src="https://images.unsplash.com/photo-1580910527739-556eb89f9d65?q=80&w=800&auto=format&fit=crop" alt="Tea Trails" className={styles.coverImg} />
                    <div className={styles.overlayCenter}>
                        <div className={styles.altitudeMeter}>
                            <span className={styles.meterValue}>1,868m</span>
                            <span className={styles.meterLabel}>Nuwara Eliya</span>
                        </div>
                        <h4 className={styles.smallTitleLight}>The Tea Trails</h4>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
