import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

export default function MagneticButton({
  children,
  className = '',
  as = 'button',
  magneticStrength = 0.3,
  damping = 15,
  stiffness = 150,
  ...props
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping, stiffness });
  const springY = useSpring(y, { damping, stiffness });

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * magneticStrength);
    y.set((e.clientY - centerY) * magneticStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = motion[as] || motion.button;

  return (
    <Component
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
