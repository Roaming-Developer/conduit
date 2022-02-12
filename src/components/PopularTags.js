import React, { useState, useEffect } from "react";
import Loader from "./Loader";

let PopularTags = () => {
  const [popularTags, setPopularTags] = useState();
  const [limitTag, SetLimitTag] = useState(20);
  useEffect(() => {
    getTags();
  }, []);

  let getTags = () => {
    fetch("https://mighty-oasis-08080.herokuapp.com/api/tags")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPopularTags(data);
      });
  };

  let tagLimit = () => {
    SetLimitTag(popularTags.tags.length);
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

export default PopularTags;
