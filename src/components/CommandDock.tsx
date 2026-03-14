'use client';

import { motion } from 'framer-motion';
import { Bird, Map, Fish, Gem, Waves, Tent, Shield, Sparkles } from 'lucide-react';
import styles from './CommandDock.module.css';

const navItems = [
    { id: 'wildlife', icon: Bird, label: 'Wildlife' },
    { id: 'beaches', icon: Waves, label: 'Beaches' },
    { id: 'culture', icon: Map, label: 'Culture' },
    { id: 'gems', icon: Gem, label: 'Gems' },
    { id: 'luxury', icon: Sparkles, label: 'Luxury' },
    { id: 'adventure', icon: Tent, label: 'Hiking' },
    { id: 'marine', icon: Fish, label: 'Marine' },
    { id: 'spiritual', icon: Shield, label: 'Spiritual' },
];

export default function CommandDock() {
    return (
        <motion.div
            className={`${styles.dockContainer} glass-container`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <div
                        key={item.id}
                        className={styles.dockItem}
                        onClick={() => {
                            const el = document.getElementById(item.id);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <div className={styles.tooltip}>{item.label}</div>
                        <Icon size={24} />
                    </div>
                );
            })}
        </motion.div>
    );
}
