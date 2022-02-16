import React, { useState } from "react";

let UserSetting = () => {
  const [imgLink, setImgLink] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let authentication = "";

  if (localStorage.getItem("conduit-user-token")) {
    authentication = localStorage.getItem("conduit-user-token");
  } else {
    //   eslint-disable-next-line
    location.replace("/");
  }

  const baseUpdateURL = "https://mighty-oasis-08080.herokuapp.com/api/user";
  console.log(baseUpdateURL);

  let handleInput = ({ target }) => {
    switch (target.name) {
      case "imglink":
        setImgLink(target.value);
        break;
      case "username":
        setUsername(target.value);
        break;
      case "bio":
        setBio(target.value);
        break;
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

  let updateInfo = (e) => {
    e.preventDefault();
    fetch(baseUpdateURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authentication,
      },
      body: JSON.stringify({
        user: {
          email: email,
          username: username,
          bio: bio,
          image: imgLink,
          password: password,
        },
      }),
    })
      .then((res) => res.json)
      .then(console.log);
  };

  return (
    <section className="settings">
      <div className="container py-2">
        <h3>Your Settings</h3>
        <form onSubmit={(e) => updateInfo(e)}>
          {/* onSubmit={e => handleInput(e)} */}
          <div className="mb-3">
            <label htmlFor="imglink" className="form-label">
              Image URL
            </label>
            <input
              type="url"
              className="form-control"
              id="imglink"
              aria-describedby="imgHelp"
              placeholder="https://avatars.githubusercontent.com/u/00000000"
              value={imgLink}
              name="imglink"
              onChange={(e) => handleInput(e)}
            />
            <div id="imgHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="usernameHelp"
              placeholder="recurive12"
              value={username}
              name="username"
              onChange={(e) => handleInput(e)}
            />
            <div id="usernameHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              type="text"
              rows={"8"}
              className="form-control"
              id="bio"
              aria-describedby="bioHelp"
              placeholder="Enter your awesome bio here!"
              value={bio}
              name="bio"
              onChange={(e) => handleInput(e)}
            />
            <div id="bioHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="user@rmail.com"
              value={email}
              name="email"
              onChange={(e) => handleInput(e)}
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              aria-describedby="passwordHelp"
              placeholder="******"
              value={password}
              name="password"
              onChange={(e) => handleInput(e)}
            />
            <div id="passwordHelp" className="form-text"></div>
          </div>
          <div>
            <button className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserSetting;
