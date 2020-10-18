import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";
import loader from "../loader.svg";

function Home({ loading, data, error }) {
  const posts = [...data];
  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="posts-container d-flex flex-column align-items-center mt-5 ">
        {posts.length
          ? posts.map((post) => (
              <div
                key={post.id}
                className="post card border-dark mb-3"
                style={{ width: "50rem" }}
              >
                {/* Card Title */}
                <div className="card-header">
                  <Link to={`/post/${post.id}`}>{post.title.rendered}</Link>
                </div>
                {/* Card Body */}
                <div className="card-body">
                  <div className="post__content card-text">
                    {renderHTML(post.excerpt.rendered)}
                  </div>
                </div>
                {/* Card Footer */}
                <div className="post__date card-footer">
                  {new Date(post.date).toLocaleDateString()}
                  <Link
                    to={`/post/${post.id}`}
                    className="btn btn-secondary float-right"
                  >
                    Read More..
                  </Link>
                </div>
              </div>
            ))
          : ""}
        {loading && <img className="loader" src={loader} alt="loading" />}
      </div>
    </>
  );
}

export default Home;
