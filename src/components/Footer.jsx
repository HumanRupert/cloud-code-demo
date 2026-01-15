import { motion } from 'framer-motion';

const Logo = () => (
  <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L4 9V23L16 30L28 23V9L16 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M16 10L10 13.5V20.5L16 24L22 20.5V13.5L16 10Z" fill="currentColor"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <Logo />
            <span className="font-semibold">Semantic</span>
          </motion.a>

          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Semantic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
