import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export function useCountUp({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  delay = 0,
}) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now() + delay;
    const endValue = parseFloat(end) || 0;

    // Custom easing function matching site's [0.16, 1, 0.3, 1]
    const easeOutExpo = (t) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;

      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = easedProgress * endValue;

      setValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, delay]);

  // Format the display value
  const formatValue = () => {
    const rounded = decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value);
    return `${prefix}${rounded}${suffix}`;
  };

  return { value: formatValue(), ref };
}

// Wrapper component for easier usage
export function AnimatedCounter({
  value,
  label,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 2000,
  delay = 0,
  className = '',
  valueClassName = '',
  labelClassName = '',
}) {
  // Parse the value string to extract number and suffix
  const parseValue = (val) => {
    const str = String(val);
    const match = str.match(/^([<>]?)(\d+\.?\d*)(.*)/);
    if (match) {
      return {
        prefix: match[1] || prefix,
        number: parseFloat(match[2]),
        suffix: match[3] || suffix,
        decimals: match[2].includes('.') ? match[2].split('.')[1].length : decimals,
      };
    }
    return { prefix, number: 0, suffix, decimals };
  };

  const parsed = parseValue(value);
  const { value: displayValue, ref } = useCountUp({
    end: parsed.number,
    duration,
    prefix: parsed.prefix,
    suffix: parsed.suffix,
    decimals: parsed.decimals,
    delay,
  });

  return (
    <div ref={ref} className={className}>
      <div className={valueClassName}>{displayValue}</div>
      {label && <div className={labelClassName}>{label}</div>}
    </div>
  );
}
