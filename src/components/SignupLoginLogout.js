import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Loader from "./Loader";

let baseURL = "https://mighty-oasis-08080.herokuapp.com/api";

// #####################
// ##    Register     ##
// #####################

let SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [error, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  let location = useLocation();

  const [loader, setLoader] = useState(false);

  let registerUser = (e) => {
    e.preventDefault();
    // sessionStorage.setItem("token", "");
    if (username && email && password) {
      setLoader(true);
      fetch(baseURL + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username,
            email,
            password,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoader(false);

          if (data.errors) {
            throw data.errors;
          } else {
            if (data.user.token)
              localStorage.setItem(
                "conduit-user-token",
                "Token " + data.user.token
              );
            localStorage.setItem("conduit-user-username", data.user.username);
            // eslint-disable-next-line
            location.replace("/dashboard"); //temporary method same in login part
          }
        })
        .catch((e) => {
          console.log(e);
          setErrors({
            email: e.email,
            username: e.username,
            password: e.password,
          });
        });
    }
  };

  let handleInput = ({ target }) => {
    switch (target.name) {
      case "email":
        setEmail(target.value);
        break;
      case "username":
        setUsername(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      default:
        break;
    }
  };

  return (
    <section className="register">
      <div className="container">
        <div className="row register-row">
          <div className="col-sm-6 register-details">
            <h4>Register</h4>
            <form onSubmit={(e) => registerUser(e)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  onChange={(e) => handleInput(e)}
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                />
              </div>
              <div id="erros" className="form-text mb-3">
                {error.email ? "Email is " + error.email : ""}
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  onChange={(e) => handleInput(e)}
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={username}
                />
              </div>
              <div id="erros" className="form-text mb-3">
                {error.username ? "UserName is " + error.username : ""}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => handleInput(e)}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                />
              </div>
              <div id="erros" className="form-text mb-3">
                {error.password ? "Password is " + error.password : ""}
              </div>
              <div id="SignUpHelp" className="form-text mb-3">
                Already have an Account? Try <Link to="/login">Login</Link>
              </div>
              {loader ? (
                <Loader isSmall={true} />
              ) : (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              )}
            </form>
          </div>
          <div className="col-sm-6 register-bg"></div>
        </div>
      </div>
    </section>
  );
};

// #####################
// ##     LOGIN       ##
// #####################

let Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({
    err: "",
  });
  // const location = useLocation();

  let handleInput = ({ target }) => {
    switch (target.name) {
      case "email":
        setEmail(target.value);
        break;
      case "password":
        setPassword(target.value);
        break;
      default:
        break;
    }
  };

  let loginUser = (e) => {
    setLoader(true);
    e.preventDefault();
    if (email && password) {
      let _token = localStorage.getItem("conduit-user-token");
      fetch(baseURL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authentication: _token,
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoader(false);
          if (data.errors) {
            throw data.errors;
          } else {
            if (data.user.token)
              localStorage.setItem(
                "conduit-user-token",
                "Token " + data.user.token
              );
            localStorage.setItem("conduit-user-username", data.user.username);
            // eslint-disable-next-line
            location.replace("/dashboard");
            //temporary
          }
        })
        .catch((e) => {
          console.log(e);
          setErrors({
            err: e,
          });
          console.log(errors.err["email or password"]);
        });
    }
  };

  return (
    <section className="login">
      <div className="container">
        <div className="row login-row">
          <div className="col-sm-6 login-details">
            <h4>Login</h4>
            <form onSubmit={(e) => loginUser(e)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  onChange={(e) => handleInput(e)}
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => handleInput(e)}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                />
              </div>
              <div id="erros" className="form-text mb-3">
                {errors.err["email or password"]
                  ? "Email or Password " + errors.err["email or password"]
                  : ""}
              </div>
              <div id="SignUpHelp" className="form-text mb-3">
                Don't have an Account? Try <Link to="/register">Sign Up</Link>
              </div>
              {loader ? (
                <Loader isSmall={true} />
              ) : (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              )}
            </form>
          </div>
          <div className="col-sm-6 login-bg"></div>
        </div>
      </div>
    </section>
  );
};

let Logout = () => {
  // let location = useLocation();

  localStorage.removeItem("conduit-user-username");
  localStorage.removeItem("conduit-user-token");

  // eslint-disable-next-line
  location.replace("./");

  return null;
};

export { SignUp, Login, Logout };
