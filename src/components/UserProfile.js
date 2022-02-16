import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArticleCard } from "./ArticleCards";
const username = localStorage.getItem("conduit-user-username");
const baseURL = "https://mighty-oasis-08080.herokuapp.com/api/";

if (!username) {
  // eslint-disable-next-line
  location.reload("/");
}

let UserProfile = () => {
  let params = useParams();
  const [image, setImage] = useState(
    "https://api.realworld.io/images/smiley-cyrus.jpeg"
  );
  const [profileData, setProfileData] = useState({});
  const [currentTag, setCurrentTag] = useState("my-articles");
  const [articleURL, setArticleURL] = useState(
    baseURL + "/articles?author=" + params.username
  );
  const [articleData, setArticleData] = useState();

  useEffect(() => {
    fetchUser(baseURL);
    fetchArticle(articleURL);
    // eslint-disable-next-line
  }, [articleURL, params.username]);

  let fetchUser = (baseURL) => {
    fetch(baseURL + "profiles/" + params.username, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("conduit-user-token"),
      },
    })
      .then((res) => res.json())
      .then(({ profile }) => {
        setImage(profile.image);
        setProfileData(profile);
        // console.log(profileData);
      });
  };

  let fetchArticle = (articleURL) => {
    fetch(articleURL, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("conduit-user-token"),
      },
    })
      .then((res) => res.json())
      .then(({ articles }) => {
        setArticleData(articles);
      });
  };

  let ArticleHead = () => {
    let dimmedClass = "feed-header py-2 px-3 dimmed";
    let activeClass = "feed-header py-2 px-3";

    let tagReset = (resetTag) => {
      setCurrentTag(resetTag);
      setArticleData([]);
      switch (resetTag) {
        case "my-articles":
          setArticleURL(baseURL + "articles?author=" + params.username);
          break;
        case "fav-articles":
          setArticleURL(baseURL + "articles?favorited=" + params.username);
          break;
        default:
          break;
      }
    };

    return (
      <div
        className="py-1"
        style={{ borderBottom: "2px solid var(--secondary-dimmed)" }}
      >
        <h6
          onClick={() => tagReset("my-articles")}
          className={currentTag === "my-articles" ? activeClass : dimmedClass}
        >
          My Articles
        </h6>
        <h6
          onClick={() => tagReset("fav-articles")}
          className={currentTag === "fav-articles" ? activeClass : dimmedClass}
        >
          Favorited Articles
        </h6>
      </div>
    );
  };

  let followToggle = (isFollow, username) => {
    let fetchFollowToggle = (method) => {
      fetch(baseURL + "profiles/" + username + "/follow", {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("conduit-user-token"),
        },
      })
        .then((res) => res.json())
        .then(() => {
          fetchUser(baseURL);
        });
    };

    switch (isFollow) {
      case true:
        fetchFollowToggle("DELETE");
        break;
      case false:
        fetchFollowToggle("POST");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <section className="profile-hero bg-light">
        <div className="container text-center py-3">
          <img
            className=" rounded-circle"
            src={image}
            alt={username}
            style={{ maxHeight: "100px" }}
          />
          <h4 className="fw-bold pt-1">@{profileData.username}</h4>
          <div className="d-flex justify-content-end">
            {username === profileData.username ? (
              <Link to={"/setting"}>
                <button className="btn btn-outline-secondary">
                  Edit User Setting
                </button>
              </Link>
            ) : (
              <button
                onClick={() =>
                  followToggle(profileData.following, profileData.username)
                }
                className="btn btn-outline-secondary"
              >
                {profileData.following ? "- Unfollow " : "+ Follow "}
                {params.username}
              </button>
            )}
          </div>
        </div>
      </section>
      <section className="container py-3">
        <ArticleHead />
        {articleData ? (
          articleData.map((element) => {
            return <ArticleCard key={element.slug} element={element} />;
          })
        ) : (
          <p>Loading</p>
        )}
      </section>
    </>
  );
};

export default UserProfile;
