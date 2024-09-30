import React, { FC, ReactNode } from "react";
import styles from "./Sky.module.scss";
import { AppState } from "../../reducer";

type Props = {
  time: AppState["TimeState"];
  children: ReactNode;
};

export const Sky: FC<Props> = ({ time, children }: Props) => (
  <div className={`${styles.container} ${styles[time]}`}>{children}</div>
);
