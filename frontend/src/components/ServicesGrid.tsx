'use client';

import { motion } from 'framer-motion';
import { Compass, PenTool, Home, Layout, Sparkles, ShieldCheck } from 'lucide-react';

const services = [
    {
        title: "Interior Architecture",
        description: "Structural design and spatial planning to maximize functionality and flow.",
        icon: Compass,
        color: "bg-charcoal-light"
    },
    {
        title: "Bespoke Furnishing",
        description: "Custom-made furniture pieces designed specifically for your unique aesthetic.",
        icon: PenTool,
        color: "bg-charcoal"
    },
    {
        title: "Residential Curation",
        description: "Transforming homes into sanctuary spaces that reflect your personality.",
        icon: Home,
        color: "bg-charcoal-light"
    },
    {
        title: "Commercial Excellence",
        description: "Designing productive and inspiring office and retail environments.",
        icon: Layout,
        color: "bg-charcoal"
    },
    {
        title: "3D Visualization",
        description: "Photorealistic AI-enhanced renderings to see your space before it exists.",
        icon: Sparkles,
        color: "bg-charcoal-light"
    },
    {
        title: "Project Management",
        description: "End-to-end oversight ensuring every detail meets our luxury standards.",
        icon: ShieldCheck,
        color: "bg-charcoal"
    }
];

export default function ServicesGrid() {
    return (
        <section className="py-24 px-6 md:px-12 bg-charcoal text-offWhite" id="services">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-mutedGold uppercase tracking-[0.3em] text-sm mb-4"
                    >
                        Our Services
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-playfair text-4xl md:text-6xl font-bold max-w-2xl"
                    >
                        Crafting the Standard of Elegance
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "80px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="h-[1px] bg-mutedGold mt-8"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative p-8 md:p-10 bg-offWhite/5 border border-offWhite/10 hover:border-mutedGold/40 transition-all duration-500 rounded-sm"
                        >
                            <div className="mb-6 inline-block p-4 rounded-sm bg-mutedGold/10 text-mutedGold group-hover:bg-mutedGold group-hover:text-charcoal transition-colors duration-500">
                                <service.icon size={28} />
                            </div>
                            <h3 className="font-playfair text-2xl mb-4 group-hover:text-mutedGold transition-colors duration-500">
                                {service.title}
                            </h3>
                            <p className="font-inter text-coolGrey leading-relaxed text-sm md:text-base">
                                {service.description}
                            </p>

                            {/* Decorative line */}
                            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-mutedGold group-hover:w-full transition-all duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
