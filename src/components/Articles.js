import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import ArticleCards from "./ArticleCards";
const baseURL = "https://mighty-oasis-08080.herokuapp.com/api/";

let Articles = (props) => {
  //   console.log(props);
  let loggedUser = props.feed ? "true" : false;
  const [currentTag, setCurrentTag] = useState(
    loggedUser ? "feed-1598" : "global"
  );
  const [popularTags, setPopularTags] = useState();
  const [feed, setFeed] = useState(false);

  const [articleURL, setArticleURL] = useState("");

  useEffect(() => {
    getTags(baseURL + "tags");
  }, []);

  let ArticleHead = () => {
    let dimmedClass = "feed-header py-2 px-3 dimmed";
    let activeClass = "feed-header py-2 px-3";

    let tagReset = (resetTag) => {
      setCurrentTag(resetTag);
    };

    return (
      <div
        className="py-1"
        style={{ borderBottom: "2px solid var(--secondary-dimmed)" }}
      >
        {loggedUser ? (
          <h6
            onClick={() => tagReset("feed-1598")}
            className={currentTag === "feed-1598" ? activeClass : dimmedClass}
          >
            Feed
          </h6>
        ) : (
          ""
        )}
        {currentTag === "global" ? (
          <h6
            className={"feed-header py-2 px-3"}
            onClick={() => tagReset("global")}
          >
            Global Feed
          </h6>
        ) : (
          <h6
            className={"feed-header py-2 px-3 dimmed"}
            onClick={() => tagReset("global")}
          >
            Global Feed
          </h6>
        )}
        {currentTag !== "global" && currentTag !== "feed-1598" ? (
          <h6 className="feed-header py-2 px-3">{"#" + currentTag}</h6>
        ) : (
          ""
        )}
      </div>
    );
  };

  let getTags = (tagURL) => {
    fetch(tagURL)
      .then((res) => res.json())
      .then((tags) => {
        setPopularTags(tags);
      });
  };

  let PopularTags = () => {
    useEffect(() => {
      changeCurrentTag(currentTag);
    });
    let changeCurrentTag = (tag) => {
      setCurrentTag(tag);
      if (currentTag === "global") {
        setFeed(false);
        setArticleURL("https://mighty-oasis-08080.herokuapp.com/api/articles");
      } else if (currentTag === "feed-1598") {
        setFeed(true);
        setArticleURL(
          "https://mighty-oasis-08080.herokuapp.com/api/articles/feed"
        );
      } else {
        setFeed(false);
        setArticleURL(
          "https://mighty-oasis-08080.herokuapp.com/api/articles?tag=" +
            currentTag
        );
      }
    };

    if (popularTags) {
      return popularTags.tags.map((tag) => (
        <span
          key={Math.random() + tag}
          className="badge rounded-pill me-1"
          onClick={() => changeCurrentTag(tag)}
        >
          {tag}
        </span>
      ));
    }
    return null;
  };

  return (
    <section className="articles py-4">
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <ArticleHead />
            <ArticleCards
              articleURL={articleURL}
              feed={props.feed ? props.feed : feed}
            />
          </div>
          <div className="col-sm-3 tags-div">
            <h6>Popular Tags</h6>
            <div>
              {popularTags ? <PopularTags /> : <Loader isSmall={true} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
