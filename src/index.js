import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import App from "./components/App";
import { Routes, Route, BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
