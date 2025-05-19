require("dotenv").config(); // Load environment variables from .env file

const Timer = require("./solarTime/time.js");
const Weather = require("./weather/weather.js");
const express = require("express"); // Import Express framework
const cors = require("cors"); // Import CORS middleware
const http = require("http"); // Import Node's HTTP module

const cron = require("node-cron");
const config = require('./config');
const initializeSocket = require('./config/socket');
const WeatherService = require('./services/weather/weatherService');

const date = new Date();
const currentDate = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}`;
const solarTime = new Timer(currentDate);
const weather = new Weather({});
let cromStrings = [];

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (_req, res) => {
    res.send('<h1>Cloud Simulator API</h1>');
});

app.get('/weather', (_req, res) => {
  console.log('get weather: ', weather.getWeather());
  res.json(weather.getWeather());
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);

// Initialize Weather Service and setup periodic updates
const weatherService = new WeatherService();
weatherService.setupWeatherUpdates(io);

// Listen for incoming Socket.IO connections
io.on("connection", (socket) => {
  console.log("User connected ", socket.id); // Log the socket ID of the connected user

  // Listen for "send_message" events from the connected client
  socket.on("send_message", (data) => {
    console.log("Message Received ", data); // Log the received message data
  });

  solarTime.getTimes().then((res) => {
    try {
      cromStrings = solarTime.formatTimePhases(res.data.results[0])
      solarTime.setCromJobTimes(cromStrings);
      // create cron jobs
  // solarTime.createSolarCronJobs(cromStrings, job);
  solarTime.createNamedSolarCronJobs(solarTime.getCronJobTimes(), job);
    } catch(err) {
      cromStrings = [];
      solarTime.setCromJobTimes([]);
      console.error(err);
    }
  });

  // get the weather
  weather.getWeatherData(socket.location.lat, socket.location.lon).then(res => {
    weather.setWeather(res?.data || {});
    console.log('weather: ', res?.data)
    io.to(socket.id).emit("current_weather", weather.getWeather())
  });

  const job = (fromJob) => {
    console.log('fromJob', fromJob);
    io.to(socket.id).emit("phase_change", fromJob);
    logMessage();
  }

  // Emit the weather regularly
  cron.schedule("*/30 * * * *", () => {
    weather.getWeatherData(socket.location.lat, socket.location.lon).then(res => {
      weather.setWeather(res?.data);
      console.log('weather cron: ', res.data)
      io.to(socket.id).emit("current_weather", weather.getWeather())
    });
  });

  // socket.disconnect();
});

// Start server
server.listen(config.PORT, () => {
    console.log(`Server running at http://localhost:${config.PORT}`);
});
