import React from "react";
import { Link, NavLink } from "react-router-dom";

let Header = () => {
  return (
    <>
      <nav>
        <div className="container navigation">
          <div className="nav-logo">
            <Link className="logo" to="/">
              conduit
            </Link>
          </div>
          <div className="nav-links">
            <ul>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#f50029" : "",
                    boxShadow: isActive ? "0px 2px #f50029" : "",
                  };
                }}
                className="nav-item"
                to={"./"}
              >
                Home
              </NavLink>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#f50029" : "",
                    boxShadow: isActive ? "0px 2px #f50029" : "",
                  };
                }}
                className="nav-item"
                to={"/login"}
              >
                Sign in
              </NavLink>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#f50029" : "",
                    boxShadow: isActive ? "0px 2px #f50029" : "",
                  };
                }}
                className="nav-item"
                to={"./register"}
              >
                Sign up
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
