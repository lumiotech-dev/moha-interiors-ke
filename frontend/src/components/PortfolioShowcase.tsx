'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function PortfolioShowcase() {
    const containerRef = useRef(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            const { data, error } = await supabase
                .from('projects')
                .select(`
                    *,
                    project_images (
                        file_path
                    )
                `)
                .eq('status', 'published')
                .eq('is_featured', true)
                .limit(4);

            if (data) {
                setProjects(data.map(p => ({
                    ...p,
                    image: p.project_images?.[0]?.file_path || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
                })));
            }
            setLoading(false);
        }

        fetchProjects();
    }, []);

    if (loading) return (
        <div className="py-24 bg-offWhite flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-mutedGold"></div>
        </div>
    );

    return (
        <section ref={containerRef} className="py-24 bg-offWhite overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex flex-col items-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-charcoal/40 uppercase tracking-[0.4em] text-xs mb-4"
                >
                    Selected Works
                </motion.span>
                <h2 className="font-playfair text-4xl md:text-6xl text-charcoal text-center mb-8">
                    The Art of Interior Evolution
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 px-6 md:px-12">
                {projects.map((project, index) => (
                    <ProjectItem key={project.title} project={project} index={index} />
                ))}
            </div>

            <div className="mt-24 flex justify-center">
                <Link
                    href="/portfolio"
                    className="group relative inline-flex items-center gap-4 text-charcoal font-inter text-sm uppercase tracking-widest overflow-hidden"
                >
                    <span className="relative z-10 transition-colors duration-500 group-hover:text-mutedGold">View Full Collection</span>
                    <div className="w-12 h-[1px] bg-charcoal group-hover:bg-mutedGold group-hover:w-20 transition-all duration-500" />
                </Link>
            </div>
        </section>
    );
}

function ProjectItem({ project, index }: { project: any, index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -100 : 100]);

    return (
        <motion.div
            ref={ref}
            style={{ y }}
            className={`relative aspect-[3/4] md:aspect-square overflow-hidden group rounded-sm shadow-2xl ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
        >
            <div className="absolute inset-0 z-10 bg-charcoal/20 group-hover:bg-charcoal/0 transition-all duration-700" />

            {/* Background Image Wrapper for Zoom */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                    className="h-full w-full relative"
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                    />
                </motion.div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12 text-offWhite opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-charcoal/80 to-transparent">
                <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="text-mutedGold uppercase tracking-[0.2em] text-xs mb-2"
                >
                    {project.category}
                </motion.span>
                <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="font-playfair text-3xl md:text-4xl"
                >
                    {project.title}
                </motion.h3>
            </div>
        </motion.div>
    );
}
