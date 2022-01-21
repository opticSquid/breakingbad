import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./context/ContextProvider";
import reducer from "./context/Reducer";
import { InitialState } from "./context/InitialState";
ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={InitialState}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
