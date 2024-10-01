import React, { FC, ReactNode } from "react";
import styles from "./Sky.module.scss";
import { AppState } from "../../reducer";

type Props = {
  time: AppState["TimeState"];
  children: ReactNode;
};

export const Sky: FC<Props> = ({ time, children }: Props) => (
  <div className={`${styles.container}`}>
    <div style={{ opacity: time === 'day'? 1: 0 }} className={`${styles.day}`}></div>
    <div style={{ opacity: time === 'dusk'? 1: 0 }} className={`${styles.dusk}`}></div>
    <div style={time === 'night'? { opacity: 1}: { opacity: 0, backgroundPosition: 'center center' }} className={`${styles.night}`}></div>
    <div style={{ opacity: time === 'dawn'? 1: 0 }} className={`${styles.dawn}`}></div>
    {children}
  </div>
);
