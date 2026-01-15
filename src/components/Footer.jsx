import { motion } from 'framer-motion';

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
            <img src="/logo.png" alt="Semantic" className="w-6 h-6 object-contain" />
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
