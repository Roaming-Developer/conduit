import React from "react";
import Articles from "./Articles";

let Dashboard = () => {
  return (
    <>
      <Articles loggedInUser={localStorage.getItem("loggedUsername")} />
    </>
  );
};

export default Dashboard;
