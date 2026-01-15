import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export default function ThemeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center transition-colors duration-300 overflow-hidden"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-amber-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : -180,
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-sky-400" />
      </motion.div>
    </motion.button>
  );
}
