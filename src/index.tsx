import React from "react";
import { createRoot } from "react-dom";
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container as Element);

console.log("render App");

root.render(<App />);
