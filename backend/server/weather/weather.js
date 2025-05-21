const axios = require("axios");
require('dotenv').config();

class Weather {
  weatherData = {};
  london = ['51.50853', '-0.12574'];
  capeTown = ['-33.92584', '18.42322'];
  upington =  ['-28.4478', '21.2561']

  constructor(currentWeather) {
    this.weatherData = currentWeather;
  }

  async getWeatherData(lat, lon) {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat: lat || this.capeTown[0],
            lon: lon || this.capeTown[1],
            appid: `${process.env.WEATHERAPI}`,
            units: "metric"
          },
        }
      );

      return response;
    } catch (err) {
      console.error("getWeather error: ", err);
      return null;
    }
  }

  getWeather() {
    return this.weatherData;
  }

  setWeather(weather) {
    this.weatherData = weather;
  }
}

module.exports = Weather;