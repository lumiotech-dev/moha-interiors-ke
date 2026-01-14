'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

export default function HeroSection() {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
    
    // Mouse parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 200 };
    const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), springConfig);
    const yMouse = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), springConfig);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section 
            ref={ref} 
            className="relative h-screen w-full overflow-hidden bg-charcoal text-offWhite flex flex-col items-center justify-center"
            onMouseMove={handleMouseMove}
        >
            {/* Animated Background with Parallax */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 z-0"
            >
                {/* Luxury gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal z-20" />
                <div className="absolute inset-0 bg-gradient-to-r from-mutedGold/5 via-transparent to-mutedGold/5 z-20" />
                
                {/* Background Image with luxury effect */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop')`,
                        transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.1)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                />
                
                {/* Animated particles/light effects */}
                <div className="absolute inset-0 z-10">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-mutedGold rounded-full"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + i * 10}%`,
                            }}
                            animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Hero Content with 3D effect */}
            <motion.div
                style={{ opacity, x, y: yMouse }}
                className="relative z-30 flex flex-col items-center text-center px-4 max-w-6xl mx-auto"
            >
                {/* Est. Badge with luxury styling */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mb-8"
                >
                    <span className="inline-block px-6 py-2 glass border border-mutedGold/30 rounded-full font-inter text-xs md:text-sm uppercase tracking-[0.3em] text-mutedGold">
                        Est. 2015 • Nairobi, Kenya
                    </span>
                </motion.div>

                {/* Main Headline with luxury typography */}
                <div className="overflow-hidden mb-6">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="font-playfair text-6xl md:text-8xl lg:text-[12rem] font-bold leading-[0.9] text-offWhite text-shadow-luxury"
                    >
                        <span className="block">Moha</span>
                        <motion.span 
                            className="block text-gradient-gold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.2 }}
                        >
                            Interiors
                        </motion.span>
                    </motion.h1>
                </div>

                {/* Subtitle with luxury styling */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.4 }}
                    className="mb-12"
                >
                    <p className="text-xl md:text-2xl lg:text-3xl font-light text-coolGrey max-w-2xl leading-relaxed">
                        Redefining spaces with{' '}
                        <span className="text-mutedGold font-medium">bespoke elegance</span>
                        <br />
                        Where functionality meets{' '}
                        <span className="text-mutedGold font-medium">fine art</span>
                    </p>
                </motion.div>

                {/* Luxury CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.6, type: "spring", stiffness: 200 }}
                    className="flex flex-col sm:flex-row gap-4 items-center"
                >
                    <Link
                        href="/portfolio"
                        className="group relative px-10 py-4 overflow-hidden font-inter text-sm uppercase tracking-widest text-charcoal bg-mutedGold hover:bg-offWhite transition-all duration-500 rounded-sm btn-luxury shadow-luxury-gold"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Discover Our Work
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    </Link>
                    
                    <Link
                        href="/contact"
                        className="group px-10 py-4 font-inter text-sm uppercase tracking-widest text-offWhite border-2 border-mutedGold/50 hover:border-mutedGold hover:bg-mutedGold/10 transition-all duration-500 rounded-sm glass"
                    >
                        Begin Your Journey
                    </Link>
                </motion.div>

                {/* Luxury Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.8 }}
                    className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
                >
                    {[
                        { number: '500+', label: 'Projects' },
                        { number: '15+', label: 'Years' },
                        { number: '98%', label: 'Satisfaction' }
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2 + i * 0.1 }}
                            className="text-center"
                        >
                            <div className="font-playfair text-3xl md:text-5xl text-mutedGold mb-2">
                                {stat.number}
                            </div>
                            <div className="font-inter text-xs uppercase tracking-widest text-coolGrey">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Luxury Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 z-30 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest text-mutedGold/60 font-inter">Scroll</span>
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ArrowDown className="w-5 h-5 text-mutedGold" />
                </motion.div>
            </motion.div>
        </section>
    );
}
