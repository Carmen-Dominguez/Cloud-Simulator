import React, { useEffect, useReducer, useState } from "react";
import { Cloud } from "../Cloud";
import { Sky } from "../Sky";
import { reducer, AppState, TimeEvent } from "../../reducer";
import { Timer } from "src/api/Timer/Timer";
import { emptyTimeEventTimes, TimeEventTimes } from "src/models/models";
import axios from 'axios'; // Import axios for API requests
import { Socket } from "socket.io";

const { io } = require("socket.io-client"); // Import the socket.io client library

// Establish a socket connection to the server at the specified URL
const socket = io.connect('http://localhost:3000'); //'socket.io-client'

export default function App() {
  const timer = new Timer();
  const [phase, setPhase] = useState(0);
  const [receiveMessage, setReceiveMessage] = useState(""); // State to store received message

  const [state, dispatch] = useReducer(reducer, {
    TimeState: "day",
    WeatherState: "clear",
    TimeEventTimes: emptyTimeEventTimes
  } as AppState);

  // Function to send a message
  const sendMessage = async () => {
    // Emit a socket event with the message details
    socket.emit("send_message", {
      senderId: "0",     // ID of the sender
      receiverId: "phase", // ID of the receiver
      message: "change phase"   // The actual message content
    });
  }

  useEffect(() => {
    timer.getTimes().then(res => {
      dispatch({ TimeEventTimes: res.data.results[0] as TimeEventTimes } as TimeEvent);
    })
  }, [])

  useEffect(() => {
    phaseTimer();
  }, [phase]);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("receive_message", (data) => {
      console.log(data); // Log the received message data to the console
      setReceiveMessage(data); // Set the received message data to state
    });

    // Cleanup the effect by removing the event listener when the component unmounts
    return () => {
      socket.off("receive_message");
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts


  // do the phases
  function nextPhase() {
    dispatch({ TimePhase: true } as TimeEvent);
    setPhase(phase === 3 ? 0 : phase + 1);
  }

  function phaseTimer() {
    setInterval(() => {
      nextPhase();
    }, 600000);
  }

  return (
    <div onClick={nextPhase}>
      <Sky time={state.TimeState}>
        <Cloud seedNumber={7} numOctaves={5} time={state.TimeState} />
      </Sky>
    </div>
  );
}
