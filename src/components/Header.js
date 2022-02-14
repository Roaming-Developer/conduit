import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
const baseURL = "https://mighty-oasis-08080.herokuapp.com/api/";

let Header = () => {
  const [userProfile, setUserProfile] = useState({});
  let username = localStorage.getItem("loggedUsername").replaceAll('"', "");
  let profileUrl = baseURL + "/profiles/" + username.replace('"', "");

  let DefaultHeader = () => {
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

  useEffect(() => {
    fetchprofile(profileUrl);
    // eslint-disable-next-line
  }, []);

  let fetchprofile = () => {
    fetch(profileUrl)
      .then((res) => res.json())
      .then(({ profile }) => {
        setUserProfile(profile);
      });
  };

  // let AddArticle = () => {
  //   return (
  //     <div className="article-add container">
  //       <div className="add-article-btn">+</div>
  //     </div>
  //   );
  // };
  // <AddArticle className="container" />

  let LoggedHeader = (props) => {
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
                  to={"/settings"}
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
                <NavLink to="#">
                  <button className="btn-logout ms-1">Logout</button>
                </NavLink>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  };
  // to={"./user/" + userProfile.username}

  return username ? <LoggedHeader username={username} /> : <DefaultHeader />;
};

export default Header;
