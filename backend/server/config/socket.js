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

        // Store location per socket, default to Cape Town (optional, but not used for initial fetch)
        socket.location = { lat: '-33.9249', lon: '18.4241' }; // Default location: Cape Town

        socket.on('set_location', async ({ lat, lon }) => {
            socket.location = { lat, lon };
            console.log(`Location set for socket ${socket.id}:`, socket.location);

            // Now fetch and emit weather/solar data for the new location
            try {
                const weatherData = await weatherService.getCurrentWeather(lat, lon);
                io.to(socket.id).emit('current_weather', weatherData);
                console.log('Weather data emitted for socket', weatherData);

                const solarPhases = await solarTimeService.initializeSolarPhases(lat, lon);
                solarTimeService.setupPhaseJobs(io, socket.id, lat, lon);
            } catch (error) {
                console.error('Error initializing client data:', error);
            }
        });

        socket.on('send_message', (data) => {
            console.log('Message Received', new Date().toISOString(), data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });
    });

    return io;
}

module.exports = initializeSocket; 