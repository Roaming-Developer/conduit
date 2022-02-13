import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";

let Article = () => {
  let params = useParams();
  let slug = params.slug;

  // http://localhost:3000/article/form-validation-in-reactjs-using-react-functional-components-and-react-hooks-ud7zxf

  const [baseURL] = useState(
    "https://mighty-oasis-08080.herokuapp.com/api/articles/"
  );
  const [articleData, setArticleData] = useState();
  const commentURL = baseURL + slug + "/comments";

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchArticleData(baseURL + slug);
    getComments(commentURL);
  }, [baseURL, slug, commentURL]);

  let fetchArticleData = (articleURL) => {
    fetch(articleURL)
      .then((res) => res.json())
      .then(({ article }) => {
        setArticleData(article);
      });
  };

  let getComments = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then(({ comments }) => {
        console.log(comments);
        setComments(comments);
      });
  };

  let Comments = () => {
    return (
      <>
        {comments.map((comment) => (
          <div key={comment.id} className="card mt-1">
            <p className="p-3 m-0">{comment.body}</p>
            <div className="p-3" style={{ background: "#f2f2f2" }}>
              {/* #f2f2f2 */}
              <div>
                <a href={comment.author.image}>
                  <img
                    style={{ height: "25px", width: "25px" }}
                    className="article-meta-img me-1"
                    src={comment.author.image}
                    alt={comment.author.username}
                  />
                </a>
                <Link style={{ display: "inline-block" }} to={"#"}>
                  <h6 className="profile-name">{comment.author.username}</h6>
                </Link>
                <span className="ms-1" style={{ fontSize: "13px" }}>
                  {new Date(comment.createdAt).toDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}{" "}
      </>
    );
  };

  let ArticleBody = () => (
    <>
      <section className="article-hero">
        <div className="container">
          <h1>{articleData.title}</h1>
          <div className="article-meta" style={{ borderTop: "none" }}>
            <a href={articleData.author.image}>
              <img
                className="article-meta-img"
                src={articleData.author.image}
                alt=""
              />
            </a>
            <div className="profile-details">
              <Link to={"#"}>
                <h6 className="profile-name">{articleData.author.username}</h6>
              </Link>
              <p className="profile-date">
                {new Date(articleData.createdAt).toDateString()}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="articleBody">
        <div className="container">
          <div className="article-content pb-4">
            <p className="lead">{articleData.body}</p>
            {articleData.tagList.map((tag) => {
              return (
                <span key={tag} className="badge rounded-pill mx-1">
                  {tag}
                </span>
              );
            })}
          </div>
          <div className="comment-section">
            <div className="article-meta" style={{ borderTop: "none" }}>
              <a href={articleData.author.image}>
                <img
                  className="article-meta-img"
                  src={articleData.author.image}
                  alt=""
                />
              </a>
              <div className="profile-details">
                <Link to={"#"}>
                  <h6 className="profile-name">
                    {articleData.author.username}
                  </h6>
                </Link>
                <p className="profile-date">
                  {new Date(articleData.createdAt).toDateString()}
                </p>
              </div>
            </div>
            <div className="article-comments">
              <p className="lead">
                <Link to="/register">Sign up</Link> or{" "}
                <Link to="/relogingister">Sign in</Link> to add comments on this
                article.
              </p>
              {comments ? <Comments /> : <Loader />}
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return articleData ? <ArticleBody /> : <Loader />;
};

export default Article;
