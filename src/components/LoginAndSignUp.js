import { Link } from "react-router-dom";
// import { useState } from "react";

let SignUp = () => {
  return (
    <section className="register">
      <div className="container">
        <div className="row register-row">
          <div className="col-sm-6 register-details">
            <h4>Register</h4>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" id="password" />
              </div>
              <div id="SignUpHelp" className="form-text mb-3">
                Already have an Account? Try <Link to="/login">Login</Link>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col-sm-6 register-bg"></div>
        </div>
      </div>
    </section>
  );
};

let Login = () => {
  // const [username, setUsername] = useState();
  return (
    <section className="login">
      <div className="container">
        <div className="row login-row">
          <div className="col-sm-6 login-details">
            <h4>Login</h4>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control" id="password" />
              </div>
              <div id="SignUpHelp" className="form-text mb-3">
                Don't have an Account? Try <Link to="/register">Sign Up</Link>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col-sm-6 login-bg"></div>
        </div>
      </div>
    </section>
  );
};

export { SignUp, Login };
