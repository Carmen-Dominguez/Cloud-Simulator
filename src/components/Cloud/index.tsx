import React, { useEffect, useState } from "react";
import styles from "./Cloud.module.scss";
import { AppState } from "../../reducer";

type Props = {
  seedNumber: number;
  numOctaves: number;
  time: AppState["TimeState"];
  phaseDuration: number;
  weather: AppState["WeatherState"];
  key: number
};

export const Cloud = ({
  seedNumber,
  numOctaves,
  time,
  phaseDuration,
  weather
}: Props) => {
  const [perspective, setPerspective] = useState(1000);
  
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      
      setPerspective(prev => {
        const newPerspective = prev + (e.deltaY * 10);
        return Math.min(Math.max(500, newPerspective), 2000);
      });
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  const random = Math.random() * (250 - 100) + 100;
  const back = random;
  const mid = random - 20;
  const front = random - 40;

  const top = Math.floor(Math.random() * (40 - -30 + 1)) + -30;
  const left = Math.floor(Math.random() * 101);

  const animatePhase = {
    // transition: `all ${phaseDuration}s linear`,
    // WebkitTransition: `all ${phaseDuration}s linear`,
    // MozTransition: `all ${phaseDuration}s linear`,
    // OTransition: `all ${phaseDuration}s linear`,
    top: `${top}vh`,
    left: `${left}%`,
    transform: `translateZ(${perspective}px)`,
    transformStyle: 'preserve-3d',
  };

  return (
    <div className={styles[time]} style={{ perspective: '1000px' }}>
      <div style={animatePhase} className={`${styles.cloud} ${styles.cloudBack}`}></div>
      <div style={animatePhase} className={`${styles.cloud} ${styles.cloudMid}`}></div>
      <div style={animatePhase} className={`${styles.cloud} ${styles.cloudFront}`}></div>

      <svg width="0" height="0">
        <filter id="filter-back">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves={numOctaves}
            seed={seedNumber}
          />
          <feDisplacementMap in="SourceGraphic" scale={back} />
        </filter>
        <filter id="filter-mid">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves={numOctaves}
            seed={seedNumber}
          />
          <feDisplacementMap in="SourceGraphic" scale={mid} />
        </filter>
        <filter id="filter-front">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves={numOctaves}
            seed={seedNumber}
          />
          <feDisplacementMap in="SourceGraphic" scale={front} />
        </filter>
      </svg>
    </div>
  );
};
