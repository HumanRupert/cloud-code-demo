import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

/**
 * BlurText - Animated text that blurs into focus
 * Inspired by ReactBits (https://reactbits.dev)
 */
export default function BlurText({
  children,
  className = '',
  style = {},
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.08,
  animateBy = 'words', // 'words' | 'characters'
  blur = '10px',
  once = true,
  as: Component = 'span',
  onAnimationComplete,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Split text into words or characters
  const text = typeof children === 'string' ? children : '';
  const elements = animateBy === 'words'
    ? text.split(' ').map((word, i, arr) => (i < arr.length - 1 ? word + ' ' : word))
    : text.split('');

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start('visible');
      setHasAnimated(true);
    }
  }, [isInView, controls, hasAnimated]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: `blur(${blur})`,
      y: 8,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      onAnimationComplete={onAnimationComplete}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block"
          style={{
            whiteSpace: animateBy === 'words' ? 'pre' : 'normal',
          }}
        >
          {element}
        </motion.span>
      ))}
    </motion.span>
  );
}
