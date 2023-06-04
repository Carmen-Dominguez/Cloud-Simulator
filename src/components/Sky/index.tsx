import React, { FC, ReactNode } from "react";
import styles from "./Sky.module.scss";

type Props = {
  time: "day" | "twilight" | "night";
  children: ReactNode;
};

export const Sky: FC<Props> = ({ time, children }: Props) => (
  <div className={styles[time]}>{children}</div>
);
