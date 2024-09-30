import React, { Reducer } from "react";

export type AppState = {
  TimeState: "day" | "dusk" | "night" | "dawn";
  WeatherState: "clear" | "cloudy" | "rain" | "storm";
};

export type TimeEvent = {
  TimePhase: boolean; // when time moves forward to the next phase
  NextDay: boolean; // to signify the a new day
};

export const reducer: Reducer<AppState, TimeEvent> = (
  state: AppState,
  event: TimeEvent
) => {
  let TimeState: AppState["TimeState"] = "day";
  let WeatherState: AppState["WeatherState"] = "clear";

  // console.log(state, event);

  switch (state.TimeState) {
    case "day":
      if (event.TimePhase) TimeState = "dusk";
      break;

    case "dusk":
      if (event.TimePhase && event.NextDay) {
        TimeState = "day";
      } else TimeState = "night";
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

  return { TimeState, WeatherState } as unknown as AppState;
};
