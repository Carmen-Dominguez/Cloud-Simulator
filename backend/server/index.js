require("dotenv").config(); // Load environment variables from .env file

const express = require("express"); // Import Express framework
const cors = require("cors"); // Import CORS middleware
const http = require("http"); // Import Node's HTTP module
const { Server } = require("socket.io"); // Import Socket.IO Server class
const cron = require("node-cron");

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
  console.log("Cron job executed at:", new Date().toLocaleString());
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

  // Emit the received message data to all connected clients
  cron.schedule('* * * * *', () => {
    logMessage();
    io.to(socket.id).emit("receive_message", `do the thing ${new Date().toLocaleString()}`);
    });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
