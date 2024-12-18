const axios = require("axios");
require('dotenv').config();

class Weather {
  weatherData = {};

  constructor(currentWeather) {
    this.weatherData = currentWeather;
  }

  async getWeatherData(coordinates) {
    console.log('coorinates from client: ', coordinates);
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat: coordinates[0], // Cape Town
            lon: coordinates[1],
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