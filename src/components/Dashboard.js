import React from "react";
import Articles from "./Articles";

let Dashboard = (props) => {
  return props.isUserLogged ? (
    <>
      <Articles
        loggedInUser={localStorage.getItem("conduit-user-username")}
        feed={true}
      />
    </>
  ) : (
    // eslint-disable-next-line
    location.replace("/")
  );
};

export default Dashboard;
