'use client';

import { motion } from 'framer-motion';
import { Sparkles, Search } from 'lucide-react';
import styles from './VortexHero.module.css';
import { useState } from 'react';

export default function VortexHero() {
    const [query, setQuery] = useState('');

    return (
        <section className={styles.heroSection}>
            <div className={styles.obsidianJungleBg}>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
            </div>

            <div className={styles.content}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    AYUBOWAN SPATIAL
                </motion.h1>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                >
                    Design your escape. Just ask.
                </motion.p>

                <motion.div
                    className={styles.searchContainer}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                >
                    <div className={`${styles.aura} ${query.length > 0 ? styles.auraActive : ''}`}></div>
                    <input
                        type="text"
                        placeholder="I want a 5-day surf trip with luxury villas..."
                        className={styles.searchInput}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query.length > 0 ? (
                        <Sparkles className={styles.searchIconActive} size={28} />
                    ) : (
                        <Search className={styles.searchIcon} size={28} />
                    )}
                </motion.div>
            </div>
        </section>
    );
}
