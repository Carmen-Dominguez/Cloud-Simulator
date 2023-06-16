import React, { Reducer, useReducer, useState } from "react";
import { Cloud } from "../Cloud";
import { Sky } from "../Sky";
import { reducer, AppState, TimeEvent } from "../../reducer";

export default function App() {
  const [phase, setPhase] = useState(0);
  const [state, dispatch] = useReducer(reducer, {
    TimeState: "day",
    WeatherState: "clear",
  } as AppState);

  function nextPhase() {
    dispatch({ TimePhase: true, NextDay: phase === 3 } as TimeEvent);
    setPhase(phase === 3 ? 0 : phase + 1);
  }

  // setInterval(() => {
  //   nextPhase();
  // }, 5000);

  return (
    <div onClick={nextPhase}>
      <Sky time={state.TimeState}>
        <Cloud seedNumber={7} numOctaves={5} time={state.TimeState} />
      </Sky>
    </div>
  );
}
