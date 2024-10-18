const axios = require("axios");
const cron = require("node-cron");

// const date = new Date();
// const currentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

class Timer {
  constructor(currentDate) {
    this.currentDate = currentDate;
  }

  async getTimes() {
    try {
      const response = await axios.get("https://api.sunrisesunset.io/json", {
        params: {
          lat: "-33.92584", // Cape Town
          lng: "18.42322",
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

  formatTimePhases(times) {
    const day = this.addMinutes(this.formatDate(times.date, times.sunrise), 72);
    const testCron = '30 15 * * *';

    return [
      this.formatIntoCronSlot(times.date, times.first_light), 
      this.formatIntoCronSlot(times.date, times.dawn), 
      this.formatIntoCronSlot(times.date, times.sunrise), 
      this.formatIntoCronSlot(times.date, day), 
      this.formatIntoCronSlot(times.date, times.golden_hour), 
      this.formatIntoCronSlot(times.date, times.sunset), 
      this.formatIntoCronSlot(times.date, times.dusk), 
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

  createSolarCronJobs(cromStrings, action) {
    cromStrings.forEach(str => {
      cron.schedule(str, () => {
        action();
        console.log(`cron created for ${str}`);
      }) 
    });
  }
}

module.exports = Timer;
