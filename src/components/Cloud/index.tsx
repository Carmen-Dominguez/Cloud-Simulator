import React, {useReducer} from "react";
import styles from "./Cloud.module.scss";
import { AppState, reducer } from "../../reducer";
import { emptyTimeEventTimes, Weather } from "src/models/models";

type Props = {
  seedNumber: number;
  numOctaves: number;
  time: AppState["TimeState"];
  phaseDuration: number;
  weather: AppState["WeatherState"];
};

export const Cloud = ({
  seedNumber,
  numOctaves,
  time,
  phaseDuration,
  weather
}: Props) => {
  const random = Math.random() * (250 - 100) + 100;
  const back = random;
  const mid = random - 20;
  const front = random - 40;

  const top = Math.floor(Math.random() * (40 - -30 + 1)) + -30;
  const left = Math.floor(Math.random() * 101);

  const animatePhase = {
    transition: `all ${phaseDuration}s linear`,
    WebkitTransition: `all ${phaseDuration}s linear`,
    MozTransition: `all ${phaseDuration}s linear`,
    OTransition: `all ${phaseDuration}s linear`,
    top: `${top}vh`,
    left: `${left}%`,
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
