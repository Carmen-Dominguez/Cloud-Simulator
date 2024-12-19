const axios = require("axios");
const cron = require("node-cron");

class Timer {
  cronJobTimes = [];
  london = ['51.50853', '-0.12574'];
  capeTown = ['-33.92584', '18.42322'];
  upington =  ['-28.4478', '21.2561'];

  constructor(currentDate) {
    this.currentDate = currentDate;
  }

  async getTimes() {
    try {
      const response = await axios.get("https://api.sunrisesunset.io/json", {
        params: {
          lat: this.upington[0], // Cape Town
          lng: this.upington[1],
          date_start: this.currentDate,
          date_end: this.currentDate,
        },
      });

      return response;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  getCronJobTimes() {
    return this.cronJobTimes;
  }

  setCromJobTimes(times) {
    this.cronJobTimes = times;
  }

  formatTimePhases(times) {
    const day = this.addMinutes(this.formatDate(times.date, times.sunrise), 72);
    const testCron = "32 13 * * *";

    return [
      { 
        phaseTo: "dusk",
        cron: testCron,
        phaseDuration: 25,
      },
      {
        phaseTo: "dawn",
        phaseDuration: this.getTransitionTime(
          { day: times.date, time: times.first_light },
          { day: times.date, time: times.dawn }
        ),
        cron: this.formatIntoCronSlot(times.date, times.first_light),
      },
      // { cron: this.formatIntoCronSlot(times.date, times.dawn) },
      {
        phaseTo: "day",
        phaseDuration: this.getTransitionTime(
          { day: times.date, time: times.sunrise },
          { day: times.date, time: day }
        ),
        cron: this.formatIntoCronSlot(times.date, times.sunrise),
      },
      // { cron: this.formatIntoCronSlot(times.date, day) },
      {
        phaseTo: "dusk",
        phaseDuration: this.getTransitionTime(
          { day: times.date, time: times.golden_hour },
          { day: times.date, time: times.dusk }
        ),
        cron: this.formatIntoCronSlot(times.date, times.golden_hour),
      },
      { phaseTo: "night",
        phaseDuration: this.getTransitionTime(
          { day: times.date, time: times.sunset },
          { day: times.date, time: times.last_light }
        ), 
        cron: this.formatIntoCronSlot(times.date, times.sunset) },
      // {
      //   phaseTo: "night",
      //   phaseDuration: this.getTransitionTime(
      //     { day: times.date, time: times.dusk },
      //     { day: times.date, time: times.last_light }
      //   ),
      //   cron: this.formatIntoCronSlot(times.date, times.dusk),
      // },
      // { cron: this.formatIntoCronSlot(times.date, times.last_light) },
    ];
  }

  formatDate(day, time) {
    return new Date(`${day} ${time}`);
  }

  formatIntoCronSlot(day, time) {
    const formattedTime = this.getHourMinute(day, time);
    return `${formattedTime.minute} ${formattedTime.hour} * * *`;
  }

  getHourMinute(day, time) {
    const date = this.formatDate(day, time);
    const hour = date.getHours();
    const minute = date.getMinutes();

    return {hour, minute};
  }

  getTransitionTime(first, next) {
    const firstTime = this.getHourMinute(first.day, first.time);
    const nextTime = this.getHourMinute(next.day, next.time);

    const totalSeconds1 = firstTime.hour * 3600 + firstTime.minute * 60;
    const totalSeconds2 = nextTime.hour * 3600 + nextTime.minute * 60;

    return Math.abs(totalSeconds1 - totalSeconds2);
  }

  addMinutes(date, minutes) {
    const newTime = new Date(date.setMinutes(date.getMinutes() + minutes));
    return `${newTime.getHours()}:${newTime.getMinutes()}:00 AM`;
  }

  createNamedSolarCronJobs(cronStrings, action) {
    console.log('cronstrings', cronStrings);
    cronStrings.forEach((str, index) => {
      this.cronJobTimes[index] = cron.schedule(str.cron, () => {
        console.log("cron job", str);
        action(str);
        this.cronJobTimes[index].stop();
        this.cronJobTimes[index] = null;
      });
    });
  }
}

module.exports = Timer;
