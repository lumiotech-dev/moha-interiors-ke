'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            
            setScrolled(currentScrollY > 50);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Services', href: '/services' },
        { name: 'About', href: '/about' },
        { name: 'Journal', href: '/journal' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: -100 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500",
                    scrolled 
                        ? "glass shadow-luxury-soft py-3" 
                        : "bg-transparent py-6"
                )}
            >
                {/* Logo with luxury effect */}
                <Link 
                    href="/" 
                    className="z-50 group relative"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="font-playfair text-2xl md:text-3xl font-bold text-offWhite tracking-tighter"
                    >
                        Moha<span className="text-mutedGold transition-colors duration-300 group-hover:text-offWhite">.</span>
                    </motion.div>
                    <motion.div
                        className="absolute -bottom-1 left-0 h-[2px] bg-mutedGold"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                    />
                </Link>

                {/* Desktop Menu with luxury hover effects */}
                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="group relative px-4 py-2"
                        >
                            <span className="relative z-10 text-sm font-inter uppercase tracking-widest text-offWhite/80 group-hover:text-mutedGold transition-colors duration-300">
                                {link.name}
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-mutedGold/10 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                layoutId={`nav-${link.name}`}
                            />
                            <motion.div
                                className="absolute bottom-0 left-0 h-[1px] bg-mutedGold"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="group relative ml-4 px-6 py-2.5 overflow-hidden border border-mutedGold/50 hover:border-mutedGold text-mutedGold text-xs uppercase tracking-widest transition-all duration-300 rounded-sm btn-luxury"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Sparkles className="w-3 h-3" />
                            Inquire
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-mutedGold"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 text-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Inquire
                        </span>
                    </Link>
                </div>

                {/* Mobile Toggle with luxury styling */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden z-50 p-2 text-offWhite hover:text-mutedGold transition-colors duration-300 relative"
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-6 h-6" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu className="w-6 h-6" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay with luxury styling */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-charcoal/95 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 z-40 w-80 glass border-l border-mutedGold/20 flex flex-col items-center justify-center gap-8 md:hidden"
                        >
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="group relative block"
                                    >
                                        <span className="font-playfair text-4xl text-offWhite hover:text-mutedGold transition-colors duration-300">
                                            {link.name}
                                        </span>
                                        <motion.div
                                            className="absolute -bottom-2 left-0 h-[2px] bg-mutedGold"
                                            initial={{ width: 0 }}
                                            whileHover={{ width: "100%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                                className="mt-8"
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="px-8 py-3 bg-mutedGold text-charcoal font-inter text-sm uppercase tracking-widest rounded-sm hover:bg-offWhite transition-colors duration-300"
                                >
                                    Get Started
                                </Link>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
