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

  formatTimePhases(data) {}

  formatIntoCronSlot(date) {}

  getTransitionTime(first, next) {}
}

module.exports = Timer;