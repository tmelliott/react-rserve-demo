import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Rserve } from "@tmelliott/react-rserve";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Rserve
      {...{
        host: process.env.REACT_APP_R_HOST || "ws://localhost:8081",
        on_data: (v) => {
          console.log("OOB recieved: ", v.value.json());
        },
      }}
    >
      <App />
    </Rserve>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
