import { useEffect, useRef, useState } from "react";

export interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

interface UseMouseParticlesReturn {
  particles: Particle[];
}

export const useMouseParticles = (): UseMouseParticlesReturn => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Add particle on mouse move (throttled)
      if (Math.random() > 0.7) {
        const newParticle: Particle = {
          id: particleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          opacity: 1
        };
        setParticles(prev => [...prev.slice(-15), newParticle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({ ...p, opacity: p.opacity - 0.05, y: p.y - 1 }))
          .filter(p => p.opacity > 0)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return { particles };
};