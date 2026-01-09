'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: 'Residential'
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const { error } = await supabase
                .from('leads')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        source: 'Website Contact Form',
                        status: 'new'
                    }
                ]);

            if (error) throw error;

            // Note: We'd typically also log the message to a notes table or email it
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '', service: 'Residential' });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <main className="min-h-screen bg-charcoal text-offWhite overflow-x-hidden">
            <Navbar />

            <section className="pt-40 pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-mutedGold uppercase tracking-[0.3em] text-sm mb-4 block">Get In Touch</span>
                        <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-8">Let's Design Your Future</h1>
                        <p className="font-inter text-coolGrey text-lg leading-relaxed mb-12 max-w-md">
                            Whether you're looking to transform your home or refine your workspace,
                            our team of experts is ready to bring your vision to life.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="p-3 bg-mutedGold/10 text-mutedGold rounded-sm">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-playfair text-xl mb-1">Our Studio</h3>
                                    <p className="text-coolGrey">Suite 405, Westlands Commercial Centre,<br />Nairobi, Kenya</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="p-3 bg-mutedGold/10 text-mutedGold rounded-sm">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-playfair text-xl mb-1">Call Us</h3>
                                    <p className="text-coolGrey">+254 700 000 000</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="p-3 bg-mutedGold/10 text-mutedGold rounded-sm">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-playfair text-xl mb-1">Email Us</h3>
                                    <p className="text-coolGrey">concierge@mohainteriors.ke</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-offWhite/5 p-8 md:p-12 border border-offWhite/10 rounded-sm"
                    >
                        {status === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-16 h-16 bg-mutedGold text-charcoal rounded-full flex items-center justify-center mb-6">
                                    <Send size={32} />
                                </div>
                                <h3 className="font-playfair text-3xl mb-4">Request Received</h3>
                                <p className="text-coolGrey max-w-xs mx-auto mb-8">
                                    Our concierge team has received your inquiry and will contact you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="text-mutedGold uppercase tracking-widest text-sm hover:text-offWhite transition-colors"
                                >
                                    Send another inquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-coolGrey">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-transparent border-b border-offWhite/20 py-3 focus:border-mutedGold outline-none transition-colors font-inter"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-coolGrey">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-transparent border-b border-offWhite/20 py-3 focus:border-mutedGold outline-none transition-colors font-inter"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-coolGrey">Phone Number</label>
                                        <input
                                            required
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-transparent border-b border-offWhite/20 py-3 focus:border-mutedGold outline-none transition-colors font-inter"
                                            placeholder="+254 --- --- ---"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-coolGrey">Service Interest</label>
                                        <select
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                            className="w-full bg-transparent border-b border-offWhite/20 py-3 focus:border-mutedGold outline-none transition-colors font-inter appearance-none cursor-pointer"
                                        >
                                            <option className="bg-charcoal" value="Residential">Residential Design</option>
                                            <option className="bg-charcoal" value="Commercial">Commercial Design</option>
                                            <option className="bg-charcoal" value="Furniture">Bespoke Furniture</option>
                                            <option className="bg-charcoal" value="Rendering">3D Rendering</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-coolGrey">Brief Project Description</label>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-transparent border-b border-offWhite/20 py-3 focus:border-mutedGold outline-none transition-colors font-inter resize-none"
                                        placeholder="Tell us about your space..."
                                    />
                                </div>

                                {status === 'error' && (
                                    <p className="text-red-400 text-sm">Something went wrong. Please try again later.</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full py-4 bg-mutedGold text-charcoal font-inter uppercase tracking-[0.2em] text-sm font-bold hover:bg-offWhite transition-all duration-500 disabled:opacity-50"
                                >
                                    {status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
