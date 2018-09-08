import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import drizzleOptions from "./utils/drizzleOptions";
import { DrizzleProvider } from "drizzle-react";

ReactDOM.render(
  <DrizzleProvider options={drizzleOptions}>
    <App />
  </DrizzleProvider>,
  document.getElementById("root")
);
registerServiceWorker();
