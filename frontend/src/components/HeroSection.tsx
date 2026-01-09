'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function HeroSection() {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden bg-charcoal text-offWhite flex flex-col items-center justify-center">
            {/* Background Video Placeholder with Parallax */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0 opacity-40"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/10 to-charcoal z-10" />
                {/* Replace with actual video later */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                    poster="/hero-poster-placeholder.jpg" // Add a placeholder image later
                >
                    {/* <source src="/hero-video.mp4" type="video/mp4" /> */}
                </video>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center" />
            </motion.div>

            {/* Hero Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 flex flex-col items-center text-center px-4"
            >
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="font-inter text-sm md:text-base uppercase tracking-[0.2em] text-mutedGold mb-4"
                >
                    Est. 2015 • Nairobi, Kenya
                </motion.span>

                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.33, 1, 0.68, 1] }} // Cubic bezier for "luxury" feel
                        className="font-playfair text-5xl md:text-7xl lg:text-9xl font-bold leading-tight"
                    >
                        Moha Interiors
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-6 max-w-lg text-lg md:text-xl font-light text-coolGrey"
                >
                    Redefining spaces with bespoke elegance. <br />
                    Where functionality meets fine art.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="mt-12 group"
                >
                    <Link
                        href="/services"
                        className="relative px-8 py-3 overflow-hidden font-inter text-sm uppercase tracking-widest text-charcoal bg-mutedGold hover:text-offWhite transition-colors duration-500 rounded-sm"
                    >
                        <span className="relative z-10">Discover Our Work</span>
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-sm transition-all duration-300 group-hover:scale-100 group-hover:bg-charcoal/90" />
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 z-10 text-mutedGold mix-blend-difference"
            >
                <ArrowDown className="w-6 h-6" />
            </motion.div>
        </section>
    );
}
