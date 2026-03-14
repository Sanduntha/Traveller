'use client';

import { motion } from 'framer-motion';
import { Plane, Thermometer, Landmark } from 'lucide-react';
import styles from './ProvinceBentoGrid.module.css';

const provinces = [
    {
        id: 'central',
        name: 'Central Province',
        title: 'Tea & Mist',
        image: 'https://images.unsplash.com/photo-1574611122955-5baa61496637?q=80&w=1000&auto=format&fit=crop',
        facts: [
            { icon: Thermometer, text: '22°C Average' },
            { icon: Landmark, text: 'Kandy & Nuwara Eliya' }
        ],
        className: styles.large
    },
    {
        id: 'southern',
        name: 'Southern Province',
        title: 'Azure Coasts',
        image: 'https://images.unsplash.com/photo-1578519050142-afb511e518de?q=80&w=1000&auto=format&fit=crop',
        facts: [
            { icon: Thermometer, text: '30°C Average' },
            { icon: Landmark, text: 'Galle Fort & Mirissa' }
        ],
        className: ''
    },
    {
        id: 'north-central',
        name: 'North Central',
        title: 'Ancient Kings',
        image: 'https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?q=80&w=1000&auto=format&fit=crop',
        facts: [
            { icon: Thermometer, text: '32°C Average' },
            { icon: Landmark, text: 'Sigiriya Rock' }
        ],
        className: ''
    },
    {
        id: 'eastern',
        name: 'Eastern Province',
        title: 'Untamed Sands',
        image: 'https://images.unsplash.com/photo-1571406761758-9a3eed5338ef?q=80&w=1000&auto=format&fit=crop',
        facts: [
            { icon: Thermometer, text: '31°C Average' },
            { icon: Landmark, text: 'Arugam Bay' }
        ],
        className: ''
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring' as const, stiffness: 100 }
    }
};

export default function ProvinceBentoGrid() {
    return (
        <div className="section" id="provinces">
            <h2 className="section-title">Explore Regions</h2>
            <motion.div
                className={styles.bentoContainer}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {provinces.map((province) => (
                    <motion.div
                        key={province.id}
                        variants={itemVariants}
                        className={`${styles.bentoCard} ${province.className || ''}`}
                        layoutId={`card-${province.id}`}
                    >
                        <img src={province.image} alt={province.name} className={styles.featureImage} />
                        <div className={styles.cardOverlay}>
                            <motion.div className={styles.title} layoutId={`title-${province.id}`}>
                                {province.name}
                            </motion.div>
                            <div className={styles.quickFacts}>
                                <span className={styles.fact} style={{ background: 'transparent', padding: 0 }}>
                                    {province.title}
                                </span>
                                {province.facts.map((fact, i) => {
                                    const Icon = fact.icon;
                                    return (
                                        <div key={i} className={styles.fact}>
                                            <Icon size={16} />
                                            <span>{fact.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
