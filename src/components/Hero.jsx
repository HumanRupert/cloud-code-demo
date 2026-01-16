import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';

const companyLogos = [
  { name: 'XBTO', logo: '/logos/xbto.png' },
  { name: 'Tether', logo: '/logos/tether.png' },
  { name: 'Goldman Sachs', logo: '/logos/goldman-sachs.png' },
  { name: 'Antler', logo: '/logos/antler.png' },
  { name: 'Khalifa University', logo: '/logos/khalifa-university.png' },
  { name: 'Huawei', logo: '/logos/huawei.png' },
  { name: 'Nokia Bell Labs', logo: 'https://media.licdn.com/dms/image/v2/D4E0BAQGKolmYRTf1uQ/company-logo_200_200/company-logo_200_200/0/1738848703564/nokiabelllabs_logo?e=2147483647&v=beta&t=llk9AEjdCbZMXgb_RoOLYJZz2MONrkjUz1qXlG0CgLM' },
  { name: 'HSBC', logo: '/logos/hsbc.png' },
  { name: 'Google', logo: '/logos/google.png' },
];

const FloatingOrb = ({ className, delay = 0, parallaxY }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 2, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{ y: parallaxY }}
    className={`absolute rounded-full blur-3xl ${className}`}
  />
);

const ImageSkeleton = () => (
  <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
);

const LogoImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="relative h-full flex items-center justify-center">
      {!loaded && <ImageSkeleton />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`max-h-full max-w-full object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
      />
    </div>
  );
};

const LogoCarousel = () => {
  // Split logos into two groups for mobile dual carousels
  const firstHalf = companyLogos.slice(0, 5);
  const secondHalf = companyLogos.slice(5);

  // Triplicate for seamless loop
  const row1Logos = [...firstHalf, ...firstHalf, ...firstHalf];
  const row2Logos = [...secondHalf, ...secondHalf, ...secondHalf];
  const allLogos = [...companyLogos, ...companyLogos, ...companyLogos];

  return (
    <div className="relative mt-10 sm:mt-16 overflow-hidden">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-sm text-gray-400 uppercase tracking-widest text-center mb-6"
      >
        Built by Experts from
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >

        {/* Mobile: Dual carousels */}
        <div className="md:hidden">
          {/* Row 1 - scrolls left */}
          <div className="flex animate-scroll-logos mb-4">
            {row1Logos.map((company, index) => (
              <div
                key={`row1-${company.name}-${index}`}
                className="flex-shrink-0 mx-4 h-12 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                <LogoImage src={company.logo} alt={company.name} />
              </div>
            ))}
          </div>

          {/* Row 2 - scrolls right */}
          <div className="flex animate-scroll-logos-reverse">
            {row2Logos.map((company, index) => (
              <div
                key={`row2-${company.name}-${index}`}
                className="flex-shrink-0 mx-4 h-12 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                <LogoImage src={company.logo} alt={company.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Single carousel */}
        <div className="hidden md:block">
          <div className="flex animate-scroll-logos">
            {allLogos.map((company, index) => (
              <div
                key={`desktop-${company.name}-${index}`}
                className="flex-shrink-0 mx-6 lg:mx-8 h-14 lg:h-16 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                <LogoImage src={company.logo} alt={company.name} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for disabling animations
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Parallax effect using scroll
  const { scrollY } = useScroll();
  const parallaxY1 = useTransform(scrollY, [0, 500], [0, -100]);
  const parallaxY2 = useTransform(scrollY, [0, 500], [0, -50]);
  const parallaxY3 = useTransform(scrollY, [0, 500], [0, -75]);

  // Smooth spring for parallax
  const smoothY1 = useSpring(parallaxY1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(parallaxY2, { stiffness: 100, damping: 30 });
  const smoothY3 = useSpring(parallaxY3, { stiffness: 100, damping: 30 });

  useEffect(() => {
    let rafId;
    const handleMouseMove = (e) => {
      // Throttle with requestAnimationFrame
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
        rafId = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-16 overflow-hidden bg-[#fafafa]">
      {/* Animated Flowing Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Flowing blob 1 - moves diagonally (static on mobile) */}
        <motion.div
          className="absolute w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-gradient-to-br from-sky-300/50 to-blue-400/40 blur-3xl"
          animate={isMobile ? {} : {
            x: ['-20%', '30%', '10%', '-20%'],
            y: ['10%', '40%', '70%', '10%'],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: '-20%', left: '-10%' }}
        />

        {/* Flowing blob 2 - moves opposite direction (static on mobile) */}
        <motion.div
          className="absolute w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full bg-gradient-to-br from-cyan-300/45 to-sky-400/35 blur-3xl"
          animate={isMobile ? {} : {
            x: ['60%', '20%', '50%', '60%'],
            y: ['60%', '20%', '50%', '60%'],
            scale: [1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: '20%', right: '-20%' }}
        />

        {/* Flowing blob 3 - slower, larger (static on mobile) */}
        <motion.div
          className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-br from-blue-300/40 to-cyan-300/30 blur-3xl"
          animate={isMobile ? {} : {
            x: ['30%', '-10%', '40%', '30%'],
            y: ['70%', '30%', '50%', '70%'],
            scale: [1.05, 1, 1.1, 1.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ bottom: '-10%', left: '20%' }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(128,128,128,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-4">
        {/* Title */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-gray-900"
            style={{ fontFamily: 'Gambetta, serif', fontWeight: 400 }}
          >
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              The <span className="gradient-text italic" style={{ fontWeight: 600 }}>Agentic</span>
            </motion.span>
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Payment Stack
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

        {/* CTA Button with Magnetic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <MagneticButton
            as="a"
            href="#cta"
            magneticStrength={0.25}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full text-lg shadow-xl shadow-gray-900/20 hover:shadow-2xl transition-shadow relative overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10">Partner with Us</span>
            <motion.span
              className="relative z-10"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </MagneticButton>
        </motion.div>

        {/* Logo Carousel */}
        <LogoCarousel />
      </div>
    </section>
  );
}
