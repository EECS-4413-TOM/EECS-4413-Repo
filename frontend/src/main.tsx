
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

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


ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
