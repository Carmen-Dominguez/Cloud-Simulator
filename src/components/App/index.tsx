import React, { useEffect, useReducer, useState } from "react";
import { Sky } from "../Sky";
import { reducer, AppState, Action } from "../../reducer";
import { Timer } from "src/api/Timer/Timer";
import { emptyTimeEventTimes, TimeEventTimes } from "src/models/models";

const { io } = require("socket.io-client"); // Import the socket.io client library

// Establish a socket connection to the server at the specified URL
const socket = io.connect("http://localhost:5173"); //'socket.io-client'

export default function App() {
  const timer = new Timer();
  const [phase, setPhase] = useState(0);
  const [receiveMessages, setReceiveMessages] = useState([]); // State to store received message

  const [state, dispatch] = useReducer(reducer, {
    TimeState: "day",
    WeatherState: "rain",
    TimeEventTimes: emptyTimeEventTimes,
  } as AppState);

  const london = ['51.50853', '-0.12574'];
  const capeTown = ['-33.92584', '18.42322'];
  const upington =  ['-28.4478', '21.2561'];

  // Function to send a message
  const sendMessage = async (
    sendID = "0",
    receiveID = "phase",
    message = upington
  ) => {
    // Emit a socket event with the message details
    socket.emit("send_message", {
      senderId: sendID, // ID of the sender
      receiverId: receiveID, // ID of the receiver
      message: message, // The actual message content
    });
  };

  useEffect(() => {
    timer.getTimes().then((res) => {
      dispatch({
        Type: 'TIME',
        TimeEventTimes: res.data.results[0] as TimeEventTimes,
      } as Action);
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
      setReceiveMessages([...receiveMessages, data]); // Set the received message data to state
    });

    // change with phase of day
    socket.on("phase_change", (data: any) => {
      console.log("phase_change on server", data);
      setReceiveMessages([...receiveMessages, data]);
      nextPhase(data);
    });

    // get current weather 
    socket.on("current_weather", (data: any) => {
      setReceiveMessages([...receiveMessages, data]);
      dispatch({
        Type: 'WEATHER',
        WeatherDesc: data[0].main?.toLowerCase(),
      } as Action);
      console.log("current_weather from server", data);
    });

    console.log(receiveMessages);
    // Cleanup the effect by removing the event listener when the component unmounts
    return () => {
      socket.off("receive_message cleanup");
    };
  }, [socket, receiveMessages]); // Empty dependency array ensures this runs only once when the component mounts

  // do the phases
  function nextPhase(data?) {
    dispatch({ Type: 'PHASE', PhaseTo: data.phaseTo?.toLowerCase() } as Action);
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
      <Sky time={state.TimeState} phaseDuration={10} weather={state.WeatherState}>
      </Sky>
    </div>
  );
}
