import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';
import BlurText from './ui/BlurText';
import Aurora from './ui/Aurora';

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
      />
    </div>
  );
};

const LogoCarousel = () => {
  // All logos tripled for seamless loop
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
        {/* Single carousel for all screen sizes */}
        <div className="flex animate-scroll-logos">
          {allLogos.map((company, index) => (
            <div
              key={`logo-${company.name}-${index}`}
              className="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8 h-12 sm:h-14 lg:h-16 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <LogoImage src={company.logo} alt={company.name} />
            </div>
          ))}
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
      {/* Aurora Background - desktop only, static gradient on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {!isMobile ? (
          <Aurora
            colorStops={['#38bdf8', '#3b82f6', '#06b6d4']}
            amplitude={1.2}
            speed={0.4}
          />
        ) : (
          /* Static gradient fallback for mobile */
          <div className="absolute inset-0 bg-gradient-to-br from-sky-200/40 via-blue-100/30 to-cyan-200/40" />
        )}

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
        {/* Title with BlurText animation */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-gray-900"
          style={{ fontFamily: 'Gambetta, serif', fontWeight: 400 }}
        >
          <span className="block">
            <BlurText delay={0.2} staggerDelay={0.1} animateBy="words">
              The
            </BlurText>{' '}
            <BlurText
              delay={0.3}
              staggerDelay={0.1}
              animateBy="words"
              className="gradient-text italic pr-3"
            >
              <span style={{ fontWeight: 600 }}>Agentic</span>
            </BlurText>
          </span>
          <span className="block">
            <BlurText delay={0.5} staggerDelay={0.1} animateBy="words">
              Payment Stack
            </BlurText>
          </span>
        </h1>

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
