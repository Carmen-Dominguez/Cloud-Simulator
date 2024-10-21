const axios = require("axios");

class Weather {
  weatherData = {};

  constructor(currentWeather) {
    this.weatherData = currentWeather;
  }

  async getWeatherData() {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat: "-33.92584", // Cape Town
            lon: "18.42322",
            appid: "f4a326bb3cbe5d8909d9a4040cced738",
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
    this.getWeather = weather;
  }
}

module.exports = Weather;