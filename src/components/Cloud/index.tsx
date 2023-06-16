import React from "react";
import styles from "./Cloud.module.scss";

type Props = {
  seedNumber: number;
  numOctaves: number;
  time: "day" | "twilight" | "night";
};

export const Cloud = ({ seedNumber, numOctaves, time }: Props) => {
  const randomiser = () => {};

  return (
    <div className={styles[time]}>
      <div className={`${styles.cloud} ${styles.cloudBack}`}></div>
      <div className={`${styles.cloud} ${styles.cloudMid}`}></div>
      <div className={`${styles.cloud} ${styles.cloudFront}`}></div>

      <svg width="0" height="0">
        <filter id="filter-back">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves={numOctaves}
            seed={seedNumber}
          />
          <feDisplacementMap in="SourceGraphic" scale="170" />
        </filter>
        <filter id="filter-mid">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves={numOctaves}
            seed={seedNumber}
          />
          <feDisplacementMap in="SourceGraphic" scale="150" />
        </filter>
        <filter id="filter-front">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves={numOctaves}
            seed={seedNumber}
          />
          <feDisplacementMap in="SourceGraphic" scale="130" />
        </filter>
      </svg>
    </div>
  );
};
