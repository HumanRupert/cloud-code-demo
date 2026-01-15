import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #0ea5e9, #0284c7, #0369a1)',
        boxShadow: '0 0 10px rgba(14, 165, 233, 0.5), 0 0 20px rgba(14, 165, 233, 0.3)',
      }}
    />
  );
}
