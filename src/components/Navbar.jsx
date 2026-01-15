import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 glass shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-gray-900 font-semibold text-lg group">
          <img
            src="/logo.png"
            alt="Semantic"
            className="w-12 h-12 object-contain"
          />
          <span className="font-display text-2xl">Semantic</span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#vision" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Vision
          </a>
          <a href="#architecture" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            How it Works
          </a>
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </a>
        </div>

        <div className="flex items-center gap-4">
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
              scrolled
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-white/90 backdrop-blur text-gray-900 hover:bg-white shadow-lg shadow-black/5'
            }`}
          >
            Partner with Us
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}