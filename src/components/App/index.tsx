import React from "react";
import { Cloud } from "../Cloud";
import { Sky } from "../Sky";

export default function App() {
  return (
    <Sky time={"night"}>
      <Cloud seedNumber={7} numOctaves={5} time={"night"} />
    </Sky>
  );
}
