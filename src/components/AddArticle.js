import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const baseURL = "https://mighty-oasis-08080.herokuapp.com/api/articles/";

let AddArticle = () => {
  let params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagList, setTagList] = useState("");
  // const [articleData, setArticleData] = useState();

  let authentication = "";

  useEffect(() => {
    fetchArticleData(params.slug);
    // console.log("ss");
  }, [params.slug]);

  let fetchArticleData = (slug) => {
    if (slug) {
      fetch(baseURL + slug, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then(({ article }) => {
          // console.log(article);
          setTitle(article.title);
          setDescription(article.description);
          setBody(article.body);
          setTagList(article.tagList.join(" "));
          // setArticleData(article);
        });
    }
  };

  if (localStorage.getItem("conduit-user-token")) {
    authentication = localStorage.getItem("conduit-user-token");
  } else {
    //   eslint-disable-next-line
    location.replace("/");
  }

  const baseUpdateURL =
    "https://mighty-oasis-08080.herokuapp.com/api/articles/";
  // console.log(baseUpdateURL);

  let handleInput = ({ target }) => {
    switch (target.name) {
      case "title":
        setTitle(target.value);
        break;
      case "description":
        setDescription(target.value);
        break;
      case "body":
        setBody(target.value);
        break;
      case "tagList":
        setTagList(target.value);
        break;
      default:
        break;
    }
  };

  let updateInfo = (e) => {
    e.preventDefault();
    let tagListArray = tagList.split(" ");

    let postParam = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authentication,
      },
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tagListArray,
        },
      }),
    };

    let putParam = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authentication,
      },
      body: JSON.stringify({
        article: {
          title: title,
          description: description,
          body: body,
          tagList: tagListArray,
        },
      }),
    };

    fetch(
      params.slug ? baseUpdateURL + params.slug : baseUpdateURL,
      params.slug ? putParam : postParam
    )
      .then((res) => {
        return res.json();
      })
      .then(({ article }) => {
        //   eslint-disable-next-line
        location.replace("/article/" + article.slug);
      })
      .catch((e) => console.log(e));
  };

  return (
    <section className="settings">
      <div className="container py-2">
        <h3 className="fw-bold">Add Article</h3>
        <form onSubmit={(e) => updateInfo(e)}>
          {/* onSubmit={e => handleInput(e)} */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              aria-describedby="imgHelp"
              placeholder="How to train your dragon!"
              value={title}
              name="title"
              onChange={(e) => handleInput(e)}
            />
            <div id="imgHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              aria-describedby="descriptionHelp"
              placeholder="Short and concise description"
              value={description}
              name="description"
              onChange={(e) => handleInput(e)}
            />
            <div id="descriptionHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="body" className="form-label">
              Body
            </label>
            <textarea
              type="text"
              rows={"8"}
              className="form-control"
              id="body"
              aria-describedby="bodyHelp"
              placeholder="Enter your article's awesome body here!"
              value={body}
              name="body"
              onChange={(e) => handleInput(e)}
            />
            <div id="bodyHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="tagList" className="form-label">
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              id="tagList"
              aria-describedby="tagListHelp"
              placeholder="tag1 tag2 tag3"
              value={tagList}
              name="tagList"
              onChange={(e) => handleInput(e)}
            />
            <div id="tagListHelp" className="form-text"></div>
          </div>
          <div>
            <button className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddArticle;
