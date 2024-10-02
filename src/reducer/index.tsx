import React, { Reducer } from "react";
import { AppState, emptyTimeEventTimes, TimeEvent } from "src/models/models";

export const reducer: Reducer<AppState, TimeEvent> = (
  state: AppState,
  event: TimeEvent
) => {
  console.log('event', event);
  let TimeState: AppState["TimeState"] = "day";
  let WeatherState: AppState["WeatherState"] = "clear";
  let Timer: AppState["Timer"] = 10;
  let TimeEventTimes: AppState["TimeEventTimes"] = emptyTimeEventTimes;

  switch (state.TimeState) {
    case "day":
      if (event.TimePhase) TimeState = "dusk";
      break;

    case "dusk":
      if (event.TimePhase) TimeState = "night";
      break;

    case "night":
      if (event.TimePhase) TimeState = "dawn";
      break;

    case "dawn":
      if (event.TimePhase) TimeState = "day";
      break;

    default:
      TimeState = "day";
  }

  if (event.TimeEventTimes) TimeEventTimes = event.TimeEventTimes;

  return { ...state, TimeState, WeatherState, Timer, TimeEventTimes } as unknown as AppState;
};
export type { AppState, TimeEvent };

