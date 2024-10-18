require("dotenv").config(); // Load environment variables from .env file

const Timer = require("./solarTime/time.js");
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
let cromStrings = [];

// Define a default port if PORT is not set in .env
const PORT = process.env.PORT || 5173;

// Create an Express application
const app = express();

// Use CORS middleware to enable cross-origin requests
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
  res.send("<h1>wassup</h1>");
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
  // socket.disconnect();
  socket.on("send_message", (data) => {
    console.log("Message Received ", data); // Log the received message data
  });

  solarTime.getTimes().then((res) => {
    let times = res.data.results[0];
    cromStrings = solarTime.formatTimePhases(times)
    console.log(cromStrings);
  });

  const job = () => {
    io.to(socket.id).emit("phase_change", true)
  }

  // create cron jobs
  // solarTime.createSolarCronJobs(cromStrings, job);
  solarTime.createNamedSolarCronJobs(cromStrings, job);


  // Emit the received message data to all connected clients
  cron.schedule("55 16 * * *", () => {
    logMessage();
    io.to(socket.id).emit(
      "receive_message",
      `test message ${new Date()}`
    );
  });

});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
  
});
