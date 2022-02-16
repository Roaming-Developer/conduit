import "../App.css";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";

let UserTag = (props) => {
  return <span className="badge rounded-pill mx-1">{props.tag}</span>;
};

let ArticleCard = ({ element }) => {
  // console.log(element);
  return (
    <div className="articles-div" key={element.author.username}>
      <div className="article-meta">
        <a href={element.author.image}>
          <img className="article-meta-img" src={element.author.image} alt="" />
        </a>
        <div className="profile-details">
          <Link to={"/user/" + element.author.username}>
            <h6 className="profile-name">{element.author.username}</h6>
          </Link>
          <p className="profile-date">
            {new Date(element.createdAt).toDateString()}
          </p>
        </div>
        <div className="heart">
          <span className="badge heart-badge">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 226 226"
              style={{ fill: "#000000" }}
            >
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
                style={{ mixBlendMode: "normal" }}
              >
                <path d="M0,226v-226h226v226z" fill="none"></path>
                <g fill="#ffffff">
                  <path d="M155.375,28.25c-27.26125,0 -42.375,19.68083 -42.375,19.68083c0,0 -15.11375,-19.68083 -42.375,-19.68083c-28.60783,0 -51.79167,23.18383 -51.79167,51.79167c0,39.27692 46.25467,77.33908 59.14608,89.36417c14.85008,13.8425 35.02058,31.64 35.02058,31.64c0,0 20.1705,-17.7975 35.02058,-31.64c12.89142,-12.02508 59.14608,-50.08725 59.14608,-89.36417c0,-28.60783 -23.18383,-51.79167 -51.79167,-51.79167zM139.47025,151.7025c-1.66675,1.50667 -3.11692,2.81558 -4.294,3.91733c-7.07192,6.59167 -15.43392,14.15325 -22.17625,20.19875c-6.74233,-6.0455 -15.11375,-13.6165 -22.17625,-20.19875c-1.1865,-1.10175 -2.63667,-2.42008 -4.294,-3.91733c-13.37167,-12.08158 -48.86308,-44.17358 -48.86308,-71.66083c0,-18.17417 14.78417,-32.95833 32.95833,-32.95833c17.20425,0 27.1765,12.00625 27.44017,12.317l14.93483,15.933l14.93483,-15.933c0.09417,-0.12242 10.23592,-12.317 27.44017,-12.317c18.17417,0 32.95833,14.78417 32.95833,32.95833c0,27.48725 -35.49142,59.57925 -48.86308,71.66083z"></path>
                </g>
              </g>
            </svg>
            {element.favoritesCount}
          </span>
        </div>
      </div>
      <h4 className="article-heading">{element.title}</h4>
      <p className="article-body-limited">
        {element.title.slice(0, 100) + " . . ."}
      </p>
      <div className="article-more-option pb-3">
        <Link className="profile-date" to={"/article/" + element.slug}>
          Read More
        </Link>
        <div>
          {element.tagList
            ? element.tagList.map((tag) => (
                <UserTag
                  key={Math.random() + "_" + element.author.username}
                  tag={tag}
                />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

let ArticleCards = (props) => {
  //   console.log(props.articleURL);
  //   console.log(props);
  const [articleData, setArticleData] = useState({});

  let authParams = props.feed
    ? {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("conduit-user-token"),
        },
      }
    : {};

  //   console.log(localStorage.getItem("conduit-user-token"));

  useEffect(() => {
    fetchArticleData();
    // eslint-disable-next-line
  }, [props.articleURL]);

  let fetchArticleData = () => {
    setArticleData({});
    fetch(props.articleURL, authParams)
      .then((res) => res.json())
      .then((data) => {
        setArticleData(data);
      });
  };

  let FeedNothing = () =>
    props.feed &&
    props.articleURL ===
      "https://mighty-oasis-08080.herokuapp.com/api/articles/feed" ? (
      <p className="mt-5 text-center">Nothing to show</p>
    ) : (
      <Loader />
    );

  return (
    <>
      {articleData.articlesCount > 0 ? (
        articleData.articles.map((element) => {
          return (
            <ArticleCard
              key={Math.random() + "_" + element.author.username}
              element={element}
            />
          );
        })
      ) : (
        <FeedNothing />
      )}
    </>
  );
};

export default ArticleCards;
export { ArticleCard };
