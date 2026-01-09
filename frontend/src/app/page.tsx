import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import ServicesGrid from '@/components/ServicesGrid';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import type { Metadata } from 'next';

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

      {/* Footer Teaser */}
      <section className="py-24 px-6 md:px-12 bg-charcoal text-offWhite border-t border-offWhite/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="font-playfair text-4xl md:text-5xl mb-6">Ready to Elevate Your Space?</h2>
            <p className="font-inter text-coolGrey text-lg leading-relaxed">
              Experience the pinnacle of Kenyan interior design. Our designers are ready to
              conceptualize your dream environment today.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-10 py-4 bg-mutedGold text-charcoal font-inter uppercase tracking-widest text-sm hover:bg-offWhite transition-colors duration-500"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </main>
  );
}

// Ensure Link is imported
import Link from 'next/link';
