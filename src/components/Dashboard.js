import React from "react";
import { Link } from "react-router-dom";
import Articles from "./Articles";

let AddArticle = () => {
  return (
    <div className="container">
      <Link to={"/article/add"}>
        <button
          className="btn btn-primary fs-4 fw-bolder py-1 px-3"
          style={{
            position: "fixed",
            bottom: "10vh",
            right: "8vw",
            borderRadius: "50%",
            zIndex: 99,
          }}
        >
          +
        </button>
      </Link>
    </div>
  );
};

let Dashboard = (props) => {
  return props.isUserLogged ? (
    <>
      <AddArticle />
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
