const axios = require("axios");

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

    return [
      {'cron': this.formatIntoCronSlot(times.date, times.first_light), 'first_light': times.first_light},
      {'cron': this.formatIntoCronSlot(times.date, times.dawn), 'dawn': times.dawn},
      {'cron': this.formatIntoCronSlot(times.date, times.sunrise), 'sunrise': times.sunrise},
      {'cron': this.formatIntoCronSlot(times.date, day), 'day': day},
      {'cron': this.formatIntoCronSlot(times.date, times.golden_hour), 'golden_hour': times.golden_hour},
      {'cron': this.formatIntoCronSlot(times.date, times.sunset), 'sunset': times.sunset},
      {'cron': this.formatIntoCronSlot(times.date, times.dusk), 'dusk': times.dusk},
      {'cron': this.formatIntoCronSlot(times.date, times.last_light), 'last_light': times.last_light},
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
}

module.exports = Timer;
