import React from "react";
import type { Theme } from "../../utils";
import { useMouseParticles } from "../../hooks";
import { ParticleIcon } from "../ui";

interface MouseEffectsProps {
  theme: Theme;
}

export const MouseEffects: React.FC<MouseEffectsProps> = ({ theme }) => {
  const { particles } = useMouseParticles();

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity
          }}
        >
          <ParticleIcon theme={theme} />
        </div>
      ))}
    </div>
  );
};