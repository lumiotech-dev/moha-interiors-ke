'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Eye } from 'lucide-react';

export default function PortfolioShowcase() {
    const containerRef = useRef(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    useEffect(() => {
        async function fetchProjects() {
            try {
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
                    .limit(6)
                    .order('created_at', { ascending: false });

                if (error) {
                    console.warn('Error fetching projects:', error);
                    // Use placeholder projects if Supabase fails
                    setProjects([
                        {
                            id: 1,
                            title: 'Luxury Penthouse',
                            category: 'Residential',
                            description: 'A stunning modern penthouse with panoramic city views',
                            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'
                        },
                        {
                            id: 2,
                            title: 'Executive Office',
                            category: 'Commercial',
                            description: 'Sophisticated workspace design for modern professionals',
                            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop'
                        }
                    ]);
                } else if (data && data.length > 0) {
                    setProjects(data.map(p => ({
                        ...p,
                        image: p.project_images?.[0]?.file_path || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
                    })));
                } else {
                    // Use placeholder if no projects found
                    setProjects([
                        {
                            id: 1,
                            title: 'Luxury Penthouse',
                            category: 'Residential',
                            description: 'A stunning modern penthouse with panoramic city views',
                            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'
                        }
                    ]);
                }
            } catch (err) {
                console.warn('Failed to fetch projects:', err);
                // Use placeholder on error
                setProjects([
                    {
                        id: 1,
                        title: 'Luxury Penthouse',
                        category: 'Residential',
                        description: 'A stunning modern penthouse with panoramic city views',
                        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    if (loading) return (
        <div className="py-32 bg-offWhite flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-mutedGold border-t-transparent rounded-full"
            />
        </div>
    );

    return (
        <section 
            ref={containerRef} 
            className="relative py-32 bg-offWhite overflow-hidden"
            style={{ opacity }}
        >
            {/* Luxury background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-mutedGold/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-charcoal/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                {/* Section Header */}
                <div className="mb-20 flex flex-col items-center text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-6 py-2 bg-charcoal/5 border border-charcoal/10 rounded-full text-charcoal/60 uppercase tracking-[0.3em] text-xs mb-6"
                    >
                        Selected Works
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-playfair text-5xl md:text-7xl lg:text-8xl text-charcoal text-center mb-8 leading-tight"
                    >
                        The Art of{' '}
                        <span className="text-gradient-gold">Interior</span>
                        {' '}Evolution
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-charcoal/60 max-w-2xl"
                    >
                        Each project is a testament to our commitment to excellence, 
                        where every detail is meticulously crafted to perfection.
                    </motion.p>
                </div>

                {/* Masonry Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id || index} project={project} index={index} />
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <Link
                        href="/portfolio"
                        className="group relative px-10 py-4 overflow-hidden bg-charcoal text-offWhite font-inter text-sm uppercase tracking-widest rounded-sm btn-luxury shadow-luxury"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            View Full Collection
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-mutedGold"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 text-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-3">
                            View Full Collection
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -50 : 50, index % 2 === 0 ? 50 : -50]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    return (
        <motion.div
            ref={cardRef}
            style={{ y, scale }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative overflow-hidden rounded-sm shadow-luxury-soft card-3d ${
                index % 3 === 1 ? 'md:row-span-2' : ''
            }`}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.15 : 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
                
                {/* Luxury Gradient Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"
                    animate={{ opacity: isHovered ? 0.9 : 0.6 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Content Overlay */}
                <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10"
                    animate={{ y: isHovered ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-mutedGold uppercase tracking-[0.2em] text-xs mb-3 font-inter"
                    >
                        {project.category || 'Interior Design'}
                    </motion.span>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-playfair text-3xl md:text-4xl text-offWhite mb-4"
                    >
                        {project.title}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-coolGrey text-sm mb-6 line-clamp-2"
                    >
                        {project.description}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        animate={{ opacity: isHovered ? 1 : 0.8 }}
                    >
                        <Link
                            href={`/portfolio/${project.id || project.slug || '#'}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-mutedGold/20 backdrop-blur-sm border border-mutedGold/50 text-mutedGold hover:bg-mutedGold hover:text-charcoal transition-all duration-300 rounded-sm font-inter text-xs uppercase tracking-widest"
                        >
                            <Eye className="w-4 h-4" />
                            View Project
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Luxury Border Effect */}
                <motion.div
                    className="absolute inset-0 border-2 border-mutedGold/0 pointer-events-none"
                    animate={{ 
                        borderColor: isHovered ? "rgba(192, 160, 111, 0.5)" : "rgba(192, 160, 111, 0)",
                        boxShadow: isHovered ? "0 0 40px rgba(192, 160, 111, 0.3)" : "0 0 0 rgba(192, 160, 111, 0)"
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Shimmer Effect */}
                {isHovered && (
                    <motion.div
                        initial={{ x: "-100%", rotate: 45 }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                    />
                )}
            </div>
        </motion.div>
    );
}
