'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, PenTool, Home, Layout, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';

const services = [
    {
        title: "Interior Architecture",
        description: "Structural design and spatial planning to maximize functionality and flow. We transform empty spaces into architectural masterpieces.",
        icon: Compass,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
        gradient: "from-blue-900/20 to-charcoal"
    },
    {
        title: "Bespoke Furnishing",
        description: "Custom-made furniture pieces designed specifically for your unique aesthetic. Every piece tells your story.",
        icon: PenTool,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop",
        gradient: "from-amber-900/20 to-charcoal"
    },
    {
        title: "Residential Curation",
        description: "Transforming homes into sanctuary spaces that reflect your personality. Where comfort meets sophistication.",
        icon: Home,
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop",
        gradient: "from-emerald-900/20 to-charcoal"
    },
    {
        title: "Commercial Excellence",
        description: "Designing productive and inspiring office and retail environments. Spaces that elevate business performance.",
        icon: Layout,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
        gradient: "from-purple-900/20 to-charcoal"
    },
    {
        title: "3D Visualization",
        description: "Photorealistic AI-enhanced renderings to see your space before it exists. Experience your vision in stunning detail.",
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop",
        gradient: "from-rose-900/20 to-charcoal"
    },
    {
        title: "Project Management",
        description: "End-to-end oversight ensuring every detail meets our luxury standards. Seamless execution from concept to completion.",
        icon: ShieldCheck,
        image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000&auto=format&fit=crop",
        gradient: "from-indigo-900/20 to-charcoal"
    }
];

export default function ServicesGrid() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section 
            ref={sectionRef}
            className="relative py-32 px-6 md:px-12 bg-charcoal text-offWhite overflow-hidden" 
            id="services"
        >
            {/* Luxury background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ y }}
                    className="absolute top-0 left-1/4 w-96 h-96 bg-mutedGold/5 rounded-full blur-3xl"
                />
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-mutedGold/5 rounded-full blur-3xl"
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header with luxury styling */}
                <div className="mb-20 md:mb-32 flex flex-col items-center text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-6 py-2 glass border border-mutedGold/30 rounded-full text-mutedGold uppercase tracking-[0.3em] text-xs mb-6"
                    >
                        Our Services
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold max-w-4xl leading-tight mb-8"
                    >
                        Crafting the{' '}
                        <span className="text-gradient-gold">Standard</span>
                        {' '}of Elegance
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "120px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-[2px] bg-gradient-to-r from-transparent via-mutedGold to-transparent"
                    />
                </div>

                {/* Services Grid with 3D cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {services.map((service, index) => (
                        <ServiceCard key={service.title} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative h-[500px] card-3d"
        >
            {/* Background Image with luxury overlay */}
            <div className="absolute inset-0 overflow-hidden rounded-sm">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${service.image})`,
                        scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient}`} />
                <motion.div
                    className="absolute inset-0 bg-charcoal/60"
                    animate={{ opacity: isHovered ? 0.3 : 0.6 }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-8 z-10">
                {/* Icon */}
                <motion.div
                    animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mb-6 inline-block p-4 rounded-sm bg-mutedGold/20 backdrop-blur-sm border border-mutedGold/30 text-mutedGold group-hover:bg-mutedGold group-hover:text-charcoal transition-all duration-500 w-fit"
                >
                    <service.icon size={32} />
                </motion.div>

                {/* Text Content */}
                <div>
                    <motion.h3
                        animate={{ y: isHovered ? -5 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-playfair text-3xl md:text-4xl mb-4 group-hover:text-mutedGold transition-colors duration-500"
                    >
                        {service.title}
                    </motion.h3>
                    <motion.p
                        animate={{ opacity: isHovered ? 1 : 0.8 }}
                        className="font-inter text-coolGrey leading-relaxed text-base mb-6"
                    >
                        {service.description}
                    </motion.p>

                    {/* CTA Arrow */}
                    <motion.div
                        animate={{ x: isHovered ? 10 : 0, opacity: isHovered ? 1 : 0.7 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2 text-mutedGold font-inter text-sm uppercase tracking-widest"
                    >
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4" />
                    </motion.div>
                </div>
            </div>

            {/* Luxury border effect */}
            <motion.div
                className="absolute inset-0 border-2 border-mutedGold/0 rounded-sm"
                animate={{ 
                    borderColor: isHovered ? "rgba(192, 160, 111, 0.5)" : "rgba(192, 160, 111, 0)",
                    boxShadow: isHovered ? "0 20px 60px rgba(192, 160, 111, 0.3)" : "0 0 0 rgba(192, 160, 111, 0)"
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Shimmer effect on hover */}
            {isHovered && (
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                />
            )}
        </motion.div>
    );
}
