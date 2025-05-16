const { Server } = require('socket.io');
const config = require('./index');
const WeatherService = require('../services/weather/weatherService');
const SolarTimeService = require('../services/solarTime/solarTimeService');

function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: config.CORS_ORIGIN,
            methods: ['GET', 'POST']
        }
    });

    const weatherService = new WeatherService();
    const solarTimeService = new SolarTimeService();

    io.on('connection', async (socket) => {
        console.log('User connected', socket.id);

        // Initialize weather and solar time data for new connection
        try {
            const weatherData = await weatherService.getCurrentWeather();
            io.to(socket.id).emit('current_weather', weatherData);

            const solarPhases = await solarTimeService.initializeSolarPhases();
            solarTimeService.setupPhaseJobs(io, socket.id);
        } catch (error) {
            console.error('Error initializing client data:', error);
        }

        socket.on('send_message', (data) => {
            console.log('Message Received', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });
    });

    return io;
}

module.exports = initializeSocket; 