import React, { FC, ReactNode } from "react";
import styles from "./Sky.module.scss";
import { AppState } from "../../reducer";
import { Cloud } from "../Cloud";

type Props = {
  time: AppState["TimeState"];
  weather: AppState["WeatherState"];
  children: ReactNode;
  phaseDuration: number;
};

export const Sky: FC<Props> = ({
  time,
  phaseDuration,
  weather,
}: Props) => {
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
    opacity: `${time === 'night' ? 1: 0}`,
    backgroundPosition: `${time !== 'night' ? 'center center': ''}`,
  };

  // weather states with clouds
  let cloudNum = 0;
  switch (weather) {
    case "clear":
      cloudNum = 1;
      break;

    case "clouds":
      cloudNum = 3;
      break;

    case "rain":
      cloudNum = 5;
      // weather state should make clouds darker
      break;

    case "thunderstorm":
      cloudNum = 5;
      // weather state should make clouds darkest
      break;

    case "snow":
      cloudNum = 5;
      break;

    case "mist":
      cloudNum = 1;
      // weather state should make clouds flatter and 100% length, no movement
      break;

    default:
      break;
  }

  return (
    <div className={`${styles.container}`}>
      <div style={{...animatePhase, opacity: time === 'day'? 1: 0 }} className={`${styles.day}`}></div>
      <div style={{...animatePhase, opacity: time === 'dusk'? 1: 0 }} className={`${styles.dusk}`}></div>
      <div style={animateNight} className={`${styles.night}`}></div>
      <div style={{ ...animatePhase, opacity: time === 'dawn'? 1: 0 }} className={`${styles.dawn}`}></div>

      {Array.from({length: cloudNum}, (_, index) => (
        <Cloud key={index} weather={weather} seedNumber={5} numOctaves={5} time={time} phaseDuration={phaseDuration} />
      ))}
    </div>
  );
};
