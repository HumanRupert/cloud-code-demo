import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const companyLogos = [
  { name: 'XBTO', logo: 'https://images.seeklogo.com/logo-png/52/1/xbto-logo-png_seeklogo-527029.png' },
  { name: 'Tether', logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg' },
  { name: 'Goldman Sachs', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg' },
  { name: 'Antler', logo: 'https://images.seeklogo.com/logo-png/52/1/antler-logo-png_seeklogo-526998.png' },
  { name: 'Khalifa University', logo: 'https://upload.wikimedia.org/wikipedia/en/e/ed/Khalifa_University_logo.png' },
  { name: 'Huawei', logo: 'https://upload.wikimedia.org/wikipedia/en/0/04/Huawei_Standard_logo.svg' },
  { name: 'Nokia Bell Labs', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_Bell_Labs_logo.svg' },
];

const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 2, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute rounded-full blur-3xl ${className}`}
  />
);

const LogoCarousel = () => {
  const duplicatedLogos = [...companyLogos, ...companyLogos];

  return (
    <div className="relative mt-16 overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-sm text-gray-400 uppercase tracking-widest text-center mb-8"
      >
        Built by Experts from
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="relative"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#fafafa] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#fafafa] to-transparent z-10" />

        <div className="flex animate-scroll-logos">
          {duplicatedLogos.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex-shrink-0 mx-8 h-8 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-6 w-auto max-w-[100px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-16 overflow-hidden bg-[#fafafa]">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          className="absolute inset-0"
        >
          <FloatingOrb
            className="w-[600px] h-[600px] -top-48 -right-48 bg-gradient-to-br from-indigo-200/40 to-purple-200/30"
            delay={0}
          />
          <FloatingOrb
            className="w-[400px] h-[400px] top-1/3 -left-32 bg-gradient-to-br from-purple-200/30 to-pink-200/20"
            delay={0.2}
          />
          <FloatingOrb
            className="w-[300px] h-[300px] bottom-32 right-1/4 bg-gradient-to-br from-blue-200/25 to-indigo-200/20"
            delay={0.4}
          />
        </motion.div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Title */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900"
          >
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              The agentic
            </motion.span>
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block gradient-text"
            >
              payment stack
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          Enable agents to pay for goods, services, and resources — compliant, auditable, and human-controlled.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full text-lg shadow-xl shadow-gray-900/20 hover:bg-gray-800 transition-colors relative overflow-hidden group"
          >
            <span className="relative z-10">Partner with Us</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.a>
        </motion.div>

        {/* Logo Carousel */}
        <LogoCarousel />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-gray-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
