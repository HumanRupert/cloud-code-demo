import { useState, useRef, useCallback } from 'react';

export function use3DTilt({
  maxTilt = 10,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
  glare = false,
  glareMaxOpacity = 0.2,
} = {}) {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
  });
  const [glareStyle, setGlareStyle] = useState({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)',
    opacity: 0,
    borderRadius: 'inherit',
  });

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation based on mouse position
    const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 100ms cubic-bezier(0.03, 0.98, 0.52, 0.99)',
    });

    if (glare) {
      // Calculate glare angle and opacity
      const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI) + 90;
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const maxDistance = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);
      const opacity = (distance / maxDistance) * glareMaxOpacity;

      setGlareStyle(prev => ({
        ...prev,
        background: `linear-gradient(${angle}deg, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,0) 80%)`,
        opacity: 1,
      }));
    }
  }, [maxTilt, perspective, scale, glare, glareMaxOpacity]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    });

    if (glare) {
      setGlareStyle(prev => ({
        ...prev,
        opacity: 0,
      }));
    }
  }, [perspective, speed, glare]);

  return {
    ref,
    style,
    glareStyle,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
