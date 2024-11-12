import React, { Reducer } from "react";
import { AppState, emptyTimeEventTimes, Action } from "src/models/models";

export const reducer: Reducer<AppState, Action> = (
  state: AppState,
  event: Action
) => {
  let TimeState: AppState["TimeState"] = state.TimeState || "day";
  let WeatherState: AppState["WeatherState"] = state.WeatherState || "rain";
  let Timer: AppState["Timer"] = state.Timer || 10;
  let TimeEventTimes: AppState["TimeEventTimes"] = state.TimeEventTimes || emptyTimeEventTimes;

  console.log('event', event);

  if (event.WeatherPhase) {
    WeatherState = event.WeatherDesc;
  }

  if (event.TimePhase) {
    switch (state.TimeState) {
      case "day":
        TimeState = "dusk";
        break;

      case "dusk":
        TimeState = "night";
        break;

      case "night":
        TimeState = "dawn";
        break;

      case "dawn":
        TimeState = "day";
        break;

      default:
        TimeState = "day";
    }
  }

  if (event.TimeEventTimes) TimeEventTimes = event.TimeEventTimes;

  console.log('state before: ',state);
  console.log('what it should look like: ',{
    ...state,
    TimeState,
    WeatherState,
    Timer,
    TimeEventTimes,
  });

  return {
    ...state,
    TimeState,
    WeatherState,
    Timer,
    TimeEventTimes,
  } as unknown as AppState;
};
export type { AppState, Action };
