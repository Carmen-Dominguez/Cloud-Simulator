export type AppState = {
  TimeState: "day" | "dusk" | "night" | "dawn";
  WeatherState: "clear" | "cloudy" | "rain" | "storm";
  Timer: number;
  TimeEventTimes: TimeEventTimes;
};

export type TimeEvent = {
  TimePhase: boolean; // when time moves forward to the next phase
  NextDay: boolean; // to signify the a new day
  Timer: number; // how long a timePhase lasts
  TimeEventTimes: TimeEventTimes; // time in day when timePhase occurs
};

export type TimeEventTimes = {
  date: string;          // "2024-10-01";
  dawn: string;          // "5:59:08 AM";
  day_length: string;    // "12:25:51";
  dusk: string;          // "7:15:07 PM";
  first_light: string;   // "4:59:50 AM";
  golden_hour: string;   // "6:17:05 PM";
  last_light: string;    // "8:14:25 PM";
  solar_noon: string;    // "12:37:07 PM";
  sunrise: string;       // "6:24:11 AM";
  sunset: string;        // "6:50:03 PM";
  timezone: string;      // "Africa/Johannesburg";
  utc_offset: number;     // 120;
};

export const emptyTimeEventTimes = {
  date: "",
  dawn: "",
  day_length: "",
  dusk: "",
  first_light: "",
  golden_hour: "",
  last_light: "",
  solar_noon: "",
  sunrise: "",
  sunset: "",
  timezone: "",
  utc_offset: 0
};
