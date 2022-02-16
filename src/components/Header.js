import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
const baseURL = "https://mighty-oasis-08080.herokuapp.com/api/";

let Header = (props) => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    if (props.isUserLogged) {
      let profileURL =
        baseURL +
        "profiles/" +
        localStorage.getItem("conduit-user-username").replaceAll('"', "");
      fetchprofile(profileURL);
    }
    // eslint-disable-next-line
  }, []);

  let fetchprofile = (profileURL) => {
    fetch(profileURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ profile }) => {
        setUserProfile(profile);
      });
  };

  let LoggedNavLink = () => {
    return (
      <>
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
              to={"./dashboard"}
            >
              Dashboard
            </NavLink>
            <NavLink
              style={({ isActive }) => {
                return {
                  color: isActive ? "#f50029" : "",
                  boxShadow: isActive ? "0px 2px #f50029" : "",
                };
              }}
              className="nav-item"
              to={"/setting"}
            >
              Settings
            </NavLink>
            {" | "}
            <NavLink
              style={({ isActive }) => {
                return {
                  color: isActive ? "#f50029" : "",
                  boxShadow: isActive ? "0px 2px #f50029" : "",
                };
              }}
              className="nav-item"
              to={"./user/" + userProfile.username}
            >
              <div className="header-username">
                <img src={userProfile.image} alt={userProfile.username} />{" "}
                {userProfile.username}
              </div>
            </NavLink>
            <NavLink to="/logout">
              <button className="btn btn-primary ms-2">Logout</button>
            </NavLink>
          </ul>
        </div>
      </>
    );
  };

  let DefaultNavLinks = () => {
    return (
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
    );
  };

  let navLinks = (islogged) => {
    return islogged ? <LoggedNavLink /> : <DefaultNavLinks />;
  };

  return (
    <>
      <nav>
        <div className="container navigation">
          <div className="nav-logo">
            <Link className="logo" to="/">
              conduit
            </Link>
          </div>
          {navLinks(props.isUserLogged)}
        </div>
      </nav>
    </>
  );
};

export default Header;
