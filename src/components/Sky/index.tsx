import React, { FC, ReactNode } from "react";

type Props = {
  time: "day" | "twilight" | "night";
  children: ReactNode;
};

export const Sky: FC<Props> = ({ time, children }: Props) => (
  <div id={time}>{children}</div>
);
