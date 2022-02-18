import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./Loader";

const username = localStorage.getItem("conduit-user-username") ? true : false;

let Article = () => {
  let params = useParams();
  let slug = params.slug;

  let authentication = "";
  const pageUsername = localStorage.getItem("conduit-user-username");

  if (localStorage.getItem("conduit-user-token")) {
    authentication = localStorage.getItem("conduit-user-token");
  }

  // http://localhost:3000/article/form-validation-in-reactjs-using-react-functional-components-and-react-hooks-ud7zxf

  const [baseURL] = useState(
    "https://mighty-oasis-08080.herokuapp.com/api/articles/"
  );
  const [articleData, setArticleData] = useState();
  const [comment, setComment] = useState();
  const commentURL = baseURL + slug + "/comments";

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchArticleData();
    getComments();
    // eslint-disable-next-line
  }, []);

  let fetchArticleData = () => {
    fetch(baseURL + slug, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ article }) => {
        setArticleData(article);
      });
  };

  let getComments = () => {
    fetch(commentURL, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ comments }) => {
        setComments(comments);
      });
  };

  let deleteComment = (commentId) => {
    fetch(baseURL + slug + "/comments/" + commentId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authentication,
      },
      body: JSON.stringify({}),
    })
      // eslint-disable-next-line
      .then(() => location.replace("./" + slug));
  };

  let Comments = () => {
    return (
      <>
        <p
          className="fw-bolder fs-5"
          style={{ borderBottom: "2px solid var( --secondary-dimmed)" }}
        >
          Comments
        </p>
        {comments.length <= 0 ? (
          <p style={{ color: "var(--primary-dimmed)" }}>
            No comments to display, try add'in one
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="card mt-1">
              <p className="p-3 m-0">{comment.body}</p>
              <div className="p-3" style={{ background: "#f2f2f2" }}>
                <div className="d-flex justify-content-between align-items-center">
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
                      <h6 className="profile-name">
                        {comment.author.username}
                      </h6>
                    </Link>
                    <span className="ms-1" style={{ fontSize: "13px" }}>
                      {new Date(comment.createdAt).toDateString()}
                    </span>
                  </div>
                  {pageUsername === comment.author.username ? (
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="btn btn-danger py-1"
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </>
    );
  };

  let handleInput = ({ target }) => {
    switch (target.name) {
      case "comment":
        setComment(target.value);
        break;
      default:
        break;
    }
  };

  let CommentForm = () => {
    let addComment = (e) => {
      e.preventDefault();
      let urlString = baseURL + slug + "/comments";
      // console.log(urlString);
      if (comment.length > 0) {
        fetch(urlString, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authentication,
          },
          body: JSON.stringify({
            comment: {
              body: comment,
            },
          }),
        })
          .then((res) => res.json())
          // eslint-disable-next-line
          .then(() => location.replace("./" + slug));
      }
    };
    return (
      <>
        <form onSubmit={(e) => addComment(e)}>
          <div className="mb-3">
            <label
              htmlFor="comment"
              className="form-label fw-bolder fs-5 w-100"
              style={{ borderBottom: "2px solid var( --secondary-dimmed)" }}
            >
              ❤️'ed it? Leave a comment!
            </label>
            <textarea
              type="text"
              className="form-control mt-1"
              id="comment"
              rows={3}
              aria-describedby="commentHelp"
              placeholder="Nice Article!"
              value={comment}
              name="comment"
              key="comment-input"
              onChange={(e) => handleInput(e)}
            />
            <div id="commentHelp" className="form-text"></div>
            <div>
              <button className="btn btn-primary mt-1">Comment</button>
            </div>
          </div>
        </form>
      </>
    );
  };

  let handleArticle = (operation) => {
    switch (operation) {
      case "edit":
        // eslint-disable-next-line
        location.replace("/article/add/" + articleData.slug);
        break;
      case "delete":
        fetch(baseURL + slug, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: authentication,
          },
        })
          .then((res) => {
            // eslint-disable-next-line
            location.replace("/dashboard");
          })
          .catch((e) => {
            console.log(e);
          });
        break;
      default:
        break;
    }
  };

  let Article = () => {
    return (
      <div className="container">
        <h1>{articleData.title}</h1>
        <div className="d-flex align-items-center justify-content-between">
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
          <div>
            {pageUsername === articleData.author.username ? (
              <>
                <button
                  className="btn btn-outline-secondary me-1"
                  onClick={() => handleArticle("edit")}
                >
                  Edit Article
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleArticle("delete")}
                >
                  Delete Article
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        {pageUsername === articleData.author.username ? (
          ""
        ) : (
          <div className="d-flex">
            <button className="btn btn-outline-secondary ms-1">
              Follow {articleData.author.username}
            </button>
            <button className="btn btn-outline-info ms-1">Like Article</button>
          </div>
        )}
      </div>
    );
  };

  let ArticleBody = () => {
    return (
      <>
        <section className="article-hero">
          <Article />
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
            <div className="comment-section w-100">
              <div
                className="article-meta d-flex align-items-center height-100"
                style={{ borderTop: "none" }}
              >
                <h6 className="mb-0 me-3 fw-bolder">Created by </h6>
                <div className="d-flex align-items-center">
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
              </div>
              <div className="article-comments w-100">
                {username ? (
                  <CommentForm />
                ) : (
                  <p className="lead">
                    <Link to="/register">Sign up</Link> or{" "}
                    <Link to="/relogingister">Sign in</Link> to add comments on
                    this article.
                  </p>
                )}
                {comments ? <Comments /> : <Loader />}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return articleData ? <ArticleBody /> : <Loader />;
};

export default Article;
