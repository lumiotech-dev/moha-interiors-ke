import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import ServicesGrid from '@/components/ServicesGrid';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import type { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Moha Interiors | Luxury Interior Design Kenya',
  description: 'Redefining spaces with bespoke elegance. Premier interior design and finishing in Nairobi.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal selection:bg-mutedGold selection:text-charcoal overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ServicesGrid />
      <PortfolioShowcase />

      {/* Luxury CTA Section */}
      <section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-charcoal to-charcoal-dark overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-mutedGold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mutedGold/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-2 glass border border-mutedGold/30 rounded-full text-mutedGold uppercase tracking-[0.3em] text-xs mb-8"
            >
              Begin Your Journey
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-offWhite mb-8 leading-tight"
            >
              Ready to Elevate{' '}
              <span className="text-gradient-gold">Your Space?</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-coolGrey mb-12 leading-relaxed"
            >
              Experience the pinnacle of Kenyan interior design. Our designers are ready to
              conceptualize your dream environment today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/contact"
                className="group relative px-12 py-5 overflow-hidden bg-mutedGold text-charcoal font-inter text-sm uppercase tracking-widest rounded-sm btn-luxury shadow-luxury-gold"
              >
                <span className="relative z-10">Schedule Consultation</span>
                <motion.div
                  className="absolute inset-0 bg-offWhite"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 text-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Schedule Consultation
                </span>
              </Link>
              
              <Link
                href="/portfolio"
                className="group px-12 py-5 font-inter text-sm uppercase tracking-widest text-offWhite border-2 border-mutedGold/50 hover:border-mutedGold hover:bg-mutedGold/10 transition-all duration-500 rounded-sm glass"
              >
                View Our Work
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="relative bg-charcoal-dark border-t border-mutedGold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <h3 className="font-playfair text-3xl text-offWhite mb-4">
                Moha<span className="text-mutedGold">.</span>
              </h3>
              <p className="text-coolGrey text-sm leading-relaxed mb-6 max-w-md">
                Redefining spaces with bespoke elegance. Where functionality meets fine art.
                Premier interior design and finishing in Nairobi, Kenya.
              </p>
              <div className="flex items-center gap-2 text-coolGrey text-sm mb-4">
                <MapPin className="w-4 h-4 text-mutedGold" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2 text-coolGrey text-sm mb-4">
                <Phone className="w-4 h-4 text-mutedGold" />
                <span>+254 700 624 678</span>
              </div>
              <div className="flex items-center gap-2 text-coolGrey text-sm">
                <Mail className="w-4 h-4 text-mutedGold" />
                <span>info@mohainteriorske.co.ke</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-playfair text-lg text-offWhite mb-6 uppercase tracking-widest text-sm">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {['Portfolio', 'Services', 'About', 'Journal', 'Contact'].map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase()}`}
                      className="text-coolGrey hover:text-mutedGold transition-colors duration-300 text-sm uppercase tracking-widest"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-playfair text-lg text-offWhite mb-6 uppercase tracking-widest text-sm">
                Connect
              </h4>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: '#' },
                  { icon: Facebook, href: '#' },
                  { icon: Linkedin, href: '#' },
                ].map(({ icon: Icon, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group p-3 border border-mutedGold/20 hover:border-mutedGold hover:bg-mutedGold/10 rounded-sm transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-coolGrey group-hover:text-mutedGold transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-mutedGold/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-coolGrey text-xs uppercase tracking-widest">
              © {new Date().getFullYear()} Moha Interiors. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-coolGrey uppercase tracking-widest">
              <Link href="/privacy" className="hover:text-mutedGold transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-mutedGold transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
