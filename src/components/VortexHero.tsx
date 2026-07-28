'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import styles from './VortexHero.module.css';
import { useState, useEffect, useRef } from 'react';

/* ── Sri Lanka 4K YouTube videos ── */
const VIDEOS = [
    { id: 'TPFI-k84_SA', label: 'Drone Aerial Views', start: 10 },
    { id: 'NGoCQ3HyxQs', label: 'Scenic Relaxation',  start: 5  },
    { id: '0UAD7eaJgrQ', label: 'Unseen Sri Lanka',   start: 15 },
];

const CAPTIONS = [
    'Emerald jungles & ancient temples',
    'Golden shores & sapphire seas',
    'Timeless Pearl of the Indian Ocean',
];

function buildEmbedUrl(videoId: string, start: number, muted: boolean) {
    const params = new URLSearchParams({
        autoplay:       '1',
        mute:           muted ? '1' : '0',
        controls:       '0',        // hide bottom control bar
        disablekb:      '1',        // disable keyboard shortcuts
        fs:             '0',        // hide fullscreen button
        iv_load_policy: '3',        // hide annotations
        loop:           '1',        // loop video
        modestbranding: '1',        // minimal YouTube branding
        playsinline:    '1',        // play inline on iOS
        rel:            '0',        // no related videos at end
        showinfo:       '0',        // hide video title/uploader
        start:          String(start),
        playlist:       videoId,    // required for loop=1
        cc_load_policy: '0',        // no captions
        hl:             'en',
        widget_referrer: 'http://localhost:3000',
    });
    // youtube-nocookie.com avoids tracking cookies and suppresses more UI
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export default function VortexHero() {
    const [query,        setQuery]        = useState('');
    const [captionIndex, setCaptionIndex] = useState(0);
    const [videoIndex,   setVideoIndex]   = useState(0);
    const [isMuted,      setIsMuted]      = useState(true);
    const [loaded,       setLoaded]       = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    /* Cycle rotating captions */
    useEffect(() => {
        const t = setInterval(() => setCaptionIndex(i => (i + 1) % CAPTIONS.length), 4000);
        return () => clearInterval(t);
    }, []);

    /* Mark iframe as loaded after a buffer long enough for autoplay to start.
     * 5 seconds guarantees the video is playing before we reveal it,
     * so YouTube's play/pause/skip buttons are never visible. */
    useEffect(() => {
        setLoaded(false);
        const t = setTimeout(() => setLoaded(true), 5000);
        return () => clearTimeout(t);
    }, [videoIndex]);

    const currentVideo = VIDEOS[videoIndex];

    return (
        <section className={styles.heroSection}>

            {/* ── Video Background ── */}
            <div className={styles.videoBg}>
                {/* Fallback gradient (visible until iframe fades in) */}
                <div className={`${styles.fallbackBg} ${loaded ? styles.fallbackHidden : ''}`} />

                {/* YouTube iframe — no JS API needed, just embed URL params */}
                <iframe
                    ref={iframeRef}
                    key={`${currentVideo.id}-${isMuted ? 'm' : 'u'}`}
                    className={`${styles.ytFrame} ${loaded ? styles.ytFrameVisible : ''}`}
                    src={buildEmbedUrl(currentVideo.id, currentVideo.start, isMuted)}
                    title="Sri Lanka scenic background video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen={false}
                    aria-hidden="true"
                    tabIndex={-1}
                />

                {/* Cinematic overlays */}
                <div className={styles.overlayGradient} />
                <div className={styles.overlayVignette} />
                {/* Blocker prevents clicks reaching YouTube iframe */}
                <div className={styles.overlayBlock} aria-hidden="true" />
                {/* Covers YouTube's center play/pause/skip button cluster */}
                <div className={styles.ytCenterBlock} aria-hidden="true" />
                <div className={styles.overlayLetterbox} />
            </div>

            {/* ── Floating particles ── */}
            <div className={styles.particles} aria-hidden="true">
                {Array.from({ length: 20 }).map((_, i) => (
                    <span key={i} className={styles.particle} style={{
                        '--delay': `${(i * 1.4) % 9}s`,
                        '--x':     `${(i * 19 + 3) % 97}%`,
                        '--size':  `${2 + (i % 3)}px`,
                    } as React.CSSProperties} />
                ))}
            </div>

            {/* ── Content ── */}
            <div className={styles.content}>

                {/* Badge */}
                <motion.div
                    className={styles.countryBadge}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className={styles.badgeDot} />
                    SRI LANKA
                    <span className={styles.badgeSep}>·</span>
                    <span className={styles.badgeSub}>THE PEARL OF THE EAST</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <span className={styles.titleTop}>AYUBOWAN</span>
                    <span className={styles.titleBottom}>SPATIAL</span>
                </motion.h1>

                {/* Rotating caption */}
                <div className={styles.captionWrap}>
                    <div className={styles.captionLine} />
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={captionIndex}
                            className={styles.caption}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.55 }}
                        >
                            {CAPTIONS[captionIndex]}
                        </motion.p>
                    </AnimatePresence>
                    <div className={styles.captionLine} />
                </div>

                {/* Subtitle */}
                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.35 }}
                >
                    Design your escape. Just ask.
                </motion.p>

                {/* Search bar */}
                <motion.div
                    className={styles.searchContainer}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.55 }}
                >
                    <div className={`${styles.aura} ${query.length > 0 ? styles.auraActive : ''}`} />
                    <input
                        type="text"
                        id="hero-search"
                        placeholder="I want a 5-day surf trip with luxury villas..."
                        className={styles.searchInput}
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    {query.length > 0
                        ? <Sparkles className={styles.searchIconActive} size={24} />
                        : <Search   className={styles.searchIcon}       size={24} />
                    }
                </motion.div>

                {/* Stats */}
                <motion.div
                    className={styles.statsRow}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.85, duration: 0.8 }}
                >
                    {[
                        { value: '1,340+', label: 'Destinations' },
                        { value: '9',      label: 'Provinces'    },
                        { value: '4.9★',   label: 'Avg Rating'   },
                    ].map(stat => (
                        <div key={stat.label} className={styles.stat}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ── Controls: mute + video dots ── */}
            <div className={styles.controls}>
                {/* Mute toggle */}
                <button
                    className={styles.muteBtn}
                    onClick={() => setIsMuted(m => !m)}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    title={isMuted ? 'Unmute' : 'Mute'}
                >
                    {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                </button>

                {/* Video selector dots */}
                <div className={styles.videoDots}>
                    {VIDEOS.map((v, i) => (
                        <button
                            key={v.id}
                            className={`${styles.videoDot} ${i === videoIndex ? styles.videoDotActive : ''}`}
                            onClick={() => setVideoIndex(i)}
                            title={v.label}
                            aria-label={`Play: ${v.label}`}
                        />
                    ))}
                </div>
            </div>

            {/* ── Scroll indicator ── */}
            <motion.div
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
            >
                <span className={styles.scrollText}>Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ChevronDown size={20} color="rgba(255,255,255,0.55)" />
                </motion.div>
            </motion.div>
        </section>
    );
}
