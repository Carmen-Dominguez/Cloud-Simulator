import React, { useEffect, useReducer, useState } from "react";
import { Cloud } from "../Cloud";
import { Sky } from "../Sky";
import { reducer, AppState, TimeEvent } from "../../reducer";
import { Timer } from "src/api/Timer/Timer";
import { emptyTimeEventTimes, TimeEventTimes } from "src/models/models";
import axios from "axios"; // Import axios for API requests
import { Socket } from "socket.io";

const { io } = require("socket.io-client"); // Import the socket.io client library

// Establish a socket connection to the server at the specified URL
const socket = io.connect("http://localhost:5173"); //'socket.io-client'

export default function App() {
  const timer = new Timer();
  const [phase, setPhase] = useState(0);
  const [receiveMessage, setReceiveMessage] = useState(""); // State to store received message

  const [state, dispatch] = useReducer(reducer, {
    TimeState: "day",
    WeatherState: "clear",
    TimeEventTimes: emptyTimeEventTimes,
  } as AppState);

  // Function to send a message
  const sendMessage = async (
    sendID = "0",
    receiveID = "phase",
    message = "change phase"
  ) => {
    // Emit a socket event with the message details
    socket.emit("send_message", {
      senderId: sendID, // ID of the sender
      receiverId: receiveID, // ID of the receiver
      message: message, // The actual message content
    });

    console.log('message sent');
  };

  useEffect(() => {
    timer.getTimes().then((res) => {
      dispatch({
        TimeEventTimes: res.data.results[0] as TimeEventTimes,
      } as TimeEvent);
    });
  }, []);

  useEffect(() => {
    // phaseTimer();
    sendMessage();
  }, [phase]);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("receive_message", (data: any) => {
      console.log(data, `received: ${new Date()}`); // Log the received message data to the console
      setReceiveMessage(data); // Set the received message data to state
    });

    socket.on("phase_change", (data) => {
      console.log("change phase", data);
      setReceiveMessage(data);
      nextPhase();
    });

    // Cleanup the effect by removing the event listener when the component unmounts
    return () => {
      socket.off("receive_message cleanup");
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // do the phases
  function nextPhase() {
    dispatch({ TimePhase: true } as TimeEvent);
    setPhase(phase === 3 ? 0 : phase + 1);
    sendMessage();
  }

  // timer when there was no backend
  function phaseTimer() {
    setInterval(() => {
      nextPhase();
    }, 600000);
  }

  return (
    <div onClick={nextPhase}>
      <Sky time={state.TimeState} phaseDuration={60}>
        <Cloud seedNumber={7} numOctaves={5} time={state.TimeState} phaseDuration={60} />
      </Sky>
    </div>
  );
}
