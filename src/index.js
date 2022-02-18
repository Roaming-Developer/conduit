import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import App from "./components/App";
import { Login, SignUp, Logout } from "./components/SignupLoginLogout";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Article from "./components/Article";
import Dashboard from "./components/Dashboard";
import UserSetting from "./components/UserSetting";
import UserProfile from "./components/UserProfile";
import AddArticle from "./components/AddArticle";

let username = localStorage.getItem("conduit-user-username");
// let token = localStorage.getItem("conduit-user-token");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header isUserLogged={username ? true : false} />
      <Routes>
        <Route
          path="/"
          element={<App isUserLogged={username ? true : false} />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/article/add" element={<AddArticle />}>
          <Route path=":slug" element={<AddArticle />}></Route>
        </Route>
        <Route path="/article">
          <Route path=":slug" element={<Article />}></Route>
        </Route>
        <Route
          path="/dashboard"
          element={<Dashboard isUserLogged={username ? true : false} />}
        ></Route>
        <Route
          isUserLogged={username ? true : false}
          path="/setting"
          element={<UserSetting />}
        ></Route>
        <Route path="/user">
          <Route path=":username" element={<UserProfile />}></Route>
        </Route>
        <Route path="/logout" element={<Logout />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
