import React, { useEffect, useReducer, useState } from "react";
import { Cloud } from "../Cloud";
import { Sky } from "../Sky";
import { reducer, AppState, TimeEvent } from "../../reducer";
import { Timer } from "src/api/Timer/Timer";
import { emptyTimeEventTimes, TimeEventTimes } from "src/models/models";

export default function App() {
  const timer = new Timer();
  const [phase, setPhase] = useState(0);

  const [state, dispatch] = useReducer(reducer, {
    TimeState: "day",
    WeatherState: "clear",
    TimeEventTimes: emptyTimeEventTimes
  } as AppState);

  useEffect(() => {
    phaseTimer();
  }, [phase]);

  // do the phases
  function nextPhase() {
    dispatch({ TimePhase: true, NextDay: phase === 3 } as TimeEvent);
    setPhase(phase === 3 ? 0 : phase + 1);
  }

  function phaseTimer() {
    setInterval(() => {
      nextPhase();
    }, 20000);
  }

  return (
    <div onClick={nextPhase}>
      <Sky time={state.TimeState}>
        <Cloud seedNumber={7} numOctaves={5} time={state.TimeState} />
      </Sky>
    </div>
  );
}
