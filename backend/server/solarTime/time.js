const axios = require("axios");
const cron = require("node-cron");

class Timer {
  cronJobTimes = [];
  london = ['51.50853', '-0.12574'];
  capeTown = ['-33.92584', '18.42322'];

  constructor(currentDate) {
    this.currentDate = currentDate;
  }

  async getTimes() {
    try {
      const response = await axios.get("https://api.sunrisesunset.io/json", {
        params: {
          lat: this.capeTown[0], // Cape Town
          lng: this.capeTown[1],
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
    const testCron = "35 10 * * *";

    return [
      this.formatIntoCronSlot(times.date, times.first_light),
      // this.formatIntoCronSlot(times.date, times.dawn),
      this.formatIntoCronSlot(times.date, times.sunrise),
      this.formatIntoCronSlot(times.date, day),
      this.formatIntoCronSlot(times.date, times.golden_hour),
      this.formatIntoCronSlot(times.date, times.sunset),
      // this.formatIntoCronSlot(times.date, times.dusk),
      this.formatIntoCronSlot(times.date, times.last_light),
      testCron,
    ];
  }

  formatDate(day, time) {
    return new Date(`${day} ${time}`);
  }

  formatIntoCronSlot(day, time) {
    const date = this.formatDate(day, time);
    const hour = date.getHours();
    const minute = date.getMinutes();

    console.log(time, date, hour, minute);
    return `${minute} ${hour} * * *`;
  }

  getTransitionTime(first, next) {
    return Math.abs(first - next) / 1000;
  }

  addMinutes(date, minutes) {
    const newTime = new Date(date.setMinutes(date.getMinutes() + minutes));
    return `${newTime.getHours()}:${newTime.getMinutes()}:00 AM`;
  }

  createNamedSolarCronJobs(cronStrings, action) {
    console.log("create dynamic cron jobs", cronStrings);
    cronStrings.forEach((str, index) => {
      this.cronJobTimes[index] = cron.schedule(str, () => {
        console.log("cron job", str);
        action();
        this.cronJobTimes[index].stop();
        this.cronJobTimes[index] = null;
      });
    });
  }
}

module.exports = Timer;
