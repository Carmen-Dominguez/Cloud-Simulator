import React, { Reducer } from "react";

export type AppState = {
  TimeState: "day" | "twilight" | "night";
  WeatherState: "Clear" | "Cloudy" | "Rain" | "Storm";
};

export type TimeEvent = {
  TimePhase: boolean; // when time moves forward to the next phase
};

export const reducer: Reducer<AppState, TimeEvent> = (
  state: AppState,
  event: TimeEvent
) => {
  let time: AppState["TimeState"] = "day";
  let weather: AppState["WeatherState"] = "Clear";

  switch (state.TimeState) {
    case "day":
      if (event.TimePhase) {
        time = "twilight";
      } else time = "day";
      break;

    case "twilight":
      if (event.TimePhase) {
        time = "night";
      } else time = "twilight";
      break;

    case "night":
      if (event.TimePhase) {
        time = "twilight";
      } else time = "night";
      break;
  }

  return { time, weather } as unknown as AppState;
};
