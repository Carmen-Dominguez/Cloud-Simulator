import React from "react";
import { createRoot } from "react-dom";
import App from "./components/App";

import "./styles/global.css";

const container = document.getElementById("root");
const root = createRoot(container as Element);

console.log("render App");

root.render(<App />);
