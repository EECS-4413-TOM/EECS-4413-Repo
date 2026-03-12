import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

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
const root = document.getElementById("root")!;
createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
