import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Logo = () => (
  <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L4 9V23L16 30L28 23V9L16 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M16 10L10 13.5V20.5L16 24L22 20.5V13.5L16 10Z" fill="currentColor"/>
  </svg>
);

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
          ? 'py-3 glass dark:glass-subtle shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold text-lg group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo />
          </motion.div>
          <span>Semantic</span>
        </a>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <motion.a
            href="#cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
              scrolled
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                : 'bg-white/90 dark:bg-zinc-800/90 backdrop-blur text-gray-900 dark:text-white hover:bg-white dark:hover:bg-zinc-700 shadow-lg shadow-black/5'
            }`}
          >
            Partner with Us
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
