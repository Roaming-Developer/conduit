import "../App.css";
import { Link } from "react-router-dom";
import ArticleCards from "./ArticleCards";
import React, { useState, useEffect } from "react";
import Loader from "./Loader";
// import PopularTags from "./PopularTags";
// const baseURL = "https://mighty-oasis-08080.herokuapp.com/api/";
// const baseURL = "https://conduit.productionready.io/api";

let Articles = (props) => {
  const [baseURL] = useState("https://mighty-oasis-08080.herokuapp.com/api/");
  const [articleLimit, setArticleLimit] = useState(10);
  const [articleURL, setArticleURL] = useState(
    baseURL + "/articles?limit=" + articleLimit
  );
  const [currentTag, setCurrentTag] = useState("global");

  let PopularTags = () => {
    const [popularTags, setPopularTags] = useState();
    const [limitTag, SetLimitTag] = useState(20);

    useEffect(() => {
      getTags();
    }, []);

    let getTags = () => {
      return fetch(baseURL + "/tags")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPopularTags(data);
        });
    };
    // getTags();
    let tagLimit = () => {
      SetLimitTag(popularTags.tags.length);
    };

    let filterTagArticles = (tag) => {
      setCurrentTag(tag);
      setArticleURL(articleURL + "&tag=" + tag);
    };

    let Tag = () => {
      return (
        <>
          <>
            {popularTags.tags.map((tag, ind) =>
              ind < limitTag ? (
                <span
                  key={Math.random() + tag}
                  className="badge rounded-pill mx-1"
                  onClick={() => filterTagArticles(tag)}
                >
                  {tag}
                </span>
              ) : null
            )}
          </>
          <br />
          <span
            className="badge rounded-pill mx-1 badge-bg-primary"
            onClick={() => tagLimit()}
          >
            {"Show All"}
          </span>
        </>
      );
    };

    return popularTags ? <Tag /> : <Loader />;
  };

  let resetTag = () => {
    setCurrentTag("global");
    setArticleURL(baseURL + "/articles");
  };

  let TagHeader = () => {
    if (currentTag === "global") {
      return <h6 className="feed-header py-2 pe-1">Global Feed</h6>;
    }
    return (
      <>
        {/* <h6 className="feed-header-not py-2 pe-1">Global Feed</h6> */}
        <h6 className="feed-header py-2 pe-1 dimmed" onClick={() => resetTag()}>
          Global Feed
        </h6>
        <h6 className="feed-header py-2 pe-1 ps-4">{"#" + currentTag}</h6>
      </>
    );
  };

  let moreArticles = () => {
    setArticleLimit(articleLimit + 10);
    // console.log(articleLimit);
    // console.log(articleURL);
    setArticleURL(baseURL + "/articles?limit=" + articleLimit);
  };

  return (
    <section className="articles py-4">
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <Link className="feed-link" to="/">
              <TagHeader currentTag={currentTag} />
            </Link>
            <ArticleCards articleURL={articleURL} />
            <div className="show-more">
              <button onClick={() => moreArticles()}>Show More</button>
            </div>
          </div>
          <div className="col-sm-3 tags-div">
            <h6>Popular Tags</h6>
            <PopularTags />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
