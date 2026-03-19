
// TODO: Import React from "react"
// TODO: Import ReactDOM from "react-dom/client"
// TODO: Import App from "./App"
// TODO: Import BrowserRouter from "react-router-dom"

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import "./global.css";
/**
 * Application entry point.
 *
 * Steps to implement:
 * 1. Get the root DOM node: document.getElementById("root")
 * 2. Create the React root: ReactDOM.createRoot(rootElement)
 * 3. Render:
 *    <React.StrictMode>
 *      <BrowserRouter>
 *        <App />
 *      </BrowserRouter>
 *    </React.StrictMode>
 */

// TODO: ReactDOM.createRoot(document.getElementById("root")!).render(...)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
