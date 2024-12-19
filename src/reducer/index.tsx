import React, { Reducer } from "react";
import { AppState, emptyTimeEventTimes, Action } from "src/models/models";

export const reducer: Reducer<AppState, Action> = (
  state: AppState,
  event: Action
) => {
  let TimeState: AppState["TimeState"] = state.TimeState || "day";
  let WeatherState: AppState["WeatherState"] = state.WeatherState || "rain";
  let Timer: AppState["Timer"] = state.Timer || 10;
  let TimeEventTimes: AppState["TimeEventTimes"] =
    state.TimeEventTimes || emptyTimeEventTimes;

  const emptyState = {
    ...state,
    TimeState,
    WeatherState,
    Timer,
    TimeEventTimes,
  };

  switch (event.Type) {
    case "PHASE":
      if (event.PhaseTo) {
        return { ...state, TimeState: event.PhaseTo };
      } else {
        switch (state.TimeState) {
          case "day":
            TimeState = "dusk";
            return { ...state, TimeState: "dusk" };
            break;
  
          case "dusk":
            TimeState = "night";
            return { ...state, TimeState: "night" };
            break;
  
          case "night":
            TimeState = "dawn";
            return { ...state, TimeState: "dawn" };
            break;
  
          case "dawn":
            TimeState = "day";
            return { ...state, TimeState: "day" };
            break;
  
          default:
            TimeState = "day";
            return { ...state, TimeState: "day" };
        }  
      }
      break;

    case "WEATHER":
      return { ...state, WeatherState: event.WeatherDesc };
      break;

    case "TIME":
      return { ...state, TimeEventTimes: event.TimeEventTimes };
      break;

    case "RESET":
      return emptyState;
      break;

    default:
      throw new Error(`Unknown action type: ${event.Type}`);
      break;
  }
};
export type { AppState, Action };
