import React from "react";
import styles from "./Cloud.module.scss";
import { AppState } from "../../reducer";

type Props = {
  seedNumber: number;
  numOctaves: number;
  time: AppState["TimeState"];
  phaseDuration: number
};


export const Cloud = ({ seedNumber, numOctaves, time, phaseDuration }: Props) => {
  const random = Math.random() * (250 - 100) + 100;
  const back = random;
  const mid = random - 20;
  const front = random - 40;

  const animatePhase = {
    transition: `all ${phaseDuration}s linear`,
    WebkitTransition: `all ${phaseDuration}s linear`,
    MozTransition: `all ${phaseDuration}s linear`,
    OTransition: `all ${phaseDuration}s linear`,
  };

  return (
    <div className={styles[time]}>
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
function useState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}
