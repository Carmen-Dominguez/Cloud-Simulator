import React, { Reducer, useReducer } from "react";
import { Cloud } from "../Cloud";
import { Sky } from "../Sky";
import { reducer, AppState } from "../../reducer";

export default function App() {
  const [state, dispatch] = useReducer(reducer, "day");

  return (
    <Sky time={state}>
      <Cloud seedNumber={7} numOctaves={5} time={state} />
    </Sky>
  );
}
