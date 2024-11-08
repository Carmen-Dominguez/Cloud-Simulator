import React, { FC, ReactNode } from "react";
import styles from "./Sky.module.scss";
import { AppState } from "../../reducer";

type Props = {
  time: AppState["TimeState"];
  children: ReactNode;
  phaseDuration: number;
};

export const Sky: FC<Props> = ({ time, phaseDuration, children }: Props) => {
  const animatePhase = {
    transition: `opacity ${phaseDuration}s linear`,
    WebkitTransition: `opacity ${phaseDuration}s linear`,
    MozTransition: `opacity ${phaseDuration}s linear`,
    OTransition: `opacity ${phaseDuration}s linear`,
  };

  const animateNight = {
    transition: `all ${phaseDuration}s linear`,
    WebkitTransition: `all ${phaseDuration}s linear`,
    MozTransition: `all ${phaseDuration}s linear`,
    OTransition: `all ${phaseDuration}s linear`,
  };

  return (
  <div className={`${styles.container}`}>
    <div style={{...animatePhase, opacity: time === 'day'? 1: 0 }} className={`${styles.day}`}></div>
    <div style={{...animatePhase, opacity: time === 'dusk'? 1: 0 }} className={`${styles.dusk}`}></div>
    <div style={time === 'night'? { opacity: 1,...animateNight}: { opacity: 0, backgroundPosition: 'center center' }} className={`${styles.night}`}></div>
    <div style={{ ...animatePhase, opacity: time === 'dawn'? 1: 0 }} className={`${styles.dawn}`}></div>
    {children}
  </div>
)};
