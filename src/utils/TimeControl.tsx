import { TimeEventTimes } from "src/models/models";

export class TimeControl {
  sortTime(times: TimeEventTimes) {
    return [
      times.first_light,
      times.dawn,
      times.sunrise,
      times.golden_hour,
      times.sunset,
      times.dusk,
      times.last_light,
    ];
    return [];
  }
}
