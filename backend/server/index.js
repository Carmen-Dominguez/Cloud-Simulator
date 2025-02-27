require("dotenv").config(); // Load environment variables from .env file

const Timer = require("./solarTime/time.js");
const Weather = require("./weather/weather.js");
const express = require("express"); // Import Express framework
const cors = require("cors"); // Import CORS middleware
const http = require("http"); // Import Node's HTTP module
const { Server } = require("socket.io"); // Import Socket.IO Server class
const cron = require("node-cron");

const date = new Date();
const currentDate = `${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()}`;
const solarTime = new Timer(currentDate);
const weather = new Weather({});
let cromStrings = [];

// Define a default port if PORT is not set in .env
const PORT = process.env.PORT || 5173;

// Create an Express application
const app = express();

// Use CORS middleware to enable cross-origin requests
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
  res.send("<h1>The Weather App: Wassup</h1>");
});

// create cron jobs
function logMessage() {
  console.log("Cron job executed at:", new Date());
}

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize a new instance of Socket.IO by passing the HTTP server
const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`, // Allow requests from this origin and my frontend port = 5173
    methods: ["GET", "POST"], // Allow these HTTP methods
  },
});

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
  weather.getWeatherData().then(res => {
    weather.setWeather(res?.data?.weather || {});
    console.log('weather: ', res?.data?.weather)
    io.to(socket.id).emit("current_weather", weather.getWeather())
  });

  const job = (fromJob) => {
    console.log('fromJob', fromJob);
    io.to(socket.id).emit("phase_change", fromJob);
    logMessage();
  }

  // Emit the weather regularly
  cron.schedule("*/30 * * * *", () => {
    weather.getWeatherData().then(res => {
      weather.setWeather(res?.data?.weather);
      console.log('weather cron: ', res.data)
      io.to(socket.id).emit("current_weather", weather.getWeather())
    });
  });

  // socket.disconnect();
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
