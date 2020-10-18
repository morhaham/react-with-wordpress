import React, { Component } from "react";
import loader from "../loader.svg";
import renderHTML from "react-render-html";

function SinglePost({ loading, data, error }) {
  const post = data[0] ? data[0] : null;
  return (
    <>
      {post ? (
        <div className="d-flex flex-column align-items-center mt-5 mb-3">
          <div
            key={post.id}
            className="post card border-dark"
            style={{ width: "50rem" }}
          >
            {/* Card Title */}
            <div className="card-header">
              <h1>{post.title.rendered}</h1>
            </div>
            {/* Card Body */}
            <div className="card-body">
              <div className="post__content card-text">
                {renderHTML(post.content.rendered)}
              </div>
            </div>
            {/* Card Footer */}
            <div className="post__date card-footer">
              {new Date(post.date).toLocaleDateString()}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {loading && <img className="loader" src={loader}></img>}
      {error && <p>{error}</p>}
    </>
  );
}

export default SinglePost;
