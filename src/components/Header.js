import React from "react";
import { Link } from "react-router-dom";

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
              <Link className="nav-item" to={"#"}>
                Home
              </Link>
              <Link className="nav-item" to={"#"}>
                Sign in
              </Link>
              <Link className="nav-item" to={"#"}>
                Sign up
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
