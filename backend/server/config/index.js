require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5173,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
    WEATHER_UPDATE_INTERVAL: '*/30 * * * *', // every 30 minutes
    NODE_ENV: process.env.NODE_ENV || 'development'
};
