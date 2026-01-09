'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500",
                    scrolled ? "bg-charcoal/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-6"
                )}
            >
                <Link href="/" className="z-50 font-playfair text-2xl font-bold text-offWhite tracking-tighter">
                    Moha<span className="text-mutedGold">.</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-inter uppercase tracking-widest text-offWhite/80 hover:text-mutedGold transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="px-5 py-2 border border-mutedGold text-mutedGold text-xs uppercase tracking-widest hover:bg-mutedGold hover:text-charcoal transition-all duration-300"
                    >
                        Inquire
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden z-50 text-offWhite"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="font-playfair text-4xl text-offWhite hover:text-mutedGold transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
