const Weather = require('../../weather/weather.js');

class WeatherService {
    constructor() {
        this.weatherClient = new Weather({});
    }

    async getCurrentWeather(lat, lon) {
        try {
            const response = await this.weatherClient.getWeatherData(lat, lon);
            const weatherData = response?.data?.weather || {};
            this.weatherClient.setWeather(weatherData);
            return this.weatherClient.getWeather();
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }

    setupWeatherUpdates(io) {
        const cron = require('node-cron');
        const config = require('../../config');

        cron.schedule(config.WEATHER_UPDATE_INTERVAL, async () => {
            try {
                const weatherData = await this.getCurrentWeather();
                io.emit('current_weather', weatherData);
            } catch (error) {
                console.error('Error in weather update cron job:', error);
            }
        });
    }
}

module.exports = WeatherService; 