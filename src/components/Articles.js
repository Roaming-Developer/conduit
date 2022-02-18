import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import ArticleCards from "./ArticleCards";
// import { Pagination } from "react-bootstrap";
const baseURL = "https://mighty-oasis-08080.herokuapp.com/api/";

let Articles = (props) => {
  //   console.log(props);
  let loggedUser = props.feed ? "true" : false;
  const [currentTag, setCurrentTag] = useState(
    loggedUser ? "feed-1598" : "global"
  );
  const [popularTags, setPopularTags] = useState();
  const [feed, setFeed] = useState(false);
  const [offset, setOffset] = useState(Number(0));
  const [pageLimit, setPageLimit] = useState();
  // const [limit, setlimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [articleURL, setArticleURL] = useState(baseURL + "articles?limit=10");
  const [articleURL, setArticleURL] = useState();

  useEffect(() => {
    getTags(baseURL + "tags");
    getArticleCount(articleURL);
    // eslint-disable-next-line
  }, [articleURL, pageLimit]);

  let getArticleCount = (url) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("conduit-user-token"),
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ articlesCount }) => {
        setPageLimit(
          parseInt(
            articlesCount % 20 === 0
              ? articlesCount / 20
              : articlesCount / 20 + 1
          )
        );
      })
      .catch((e) => console.log(e));
  };

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
    fetch(tagURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("conduit-user-username"),
      },
    })
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
        setArticleURL(
          "https://mighty-oasis-08080.herokuapp.com/api/articles" +
            "?offset=" +
            offset
        );
        // console.log(articleURL);
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

  let PageLimit = () => {
    let pageClick = (offse) => {
      setCurrentPage(offse + 1);
      setOffset(parseInt(offse) * 20);
    };

    let temp = [];
    for (let i = 0; i < pageLimit; i++) {
      temp.push(i);
    }

    let classPage = "py-2 px-2 m-1 border border-danger rounded";
    let classPageActive =
      "py-2 px-2 m-1 border border-danger rounded text-light bg-danger";

    return (
      <>
        {/* <span
          onClick={() => pageClick(-1, "previous")}
          className="p-1 m-3 ms-0 ps-0"
        >
          {"<<"}
        </span> */}
        {temp.map((el) => (
          <span
            key={el}
            onClick={() => pageClick(el)}
            className={el + 1 === currentPage ? classPageActive : classPage}
          >
            {el + 1}
          </span>
        ))}
        {/* <span
          onClick={() => pageClick(-1, "next")}
          className="p-1 m-3 me-0 pe-0"
        >
          {">>"}
        </span> */}
      </>
    );
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
              setOffset={setOffset}
            />
            {/* Pagination */}
            <div className="mt-3 text-center" style={{ cursor: "pointer" }}>
              <PageLimit />
            </div>
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
