import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import App from "./components/App";
import { Login, SignUp } from "./components/LoginAndSignUp";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Article from "./components/Article";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/article">
          <Route path=":slug" element={<Article />}></Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
