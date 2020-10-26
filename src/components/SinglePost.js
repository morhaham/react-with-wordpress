import React, { Component } from "react";
import loader from "../loader.svg";
import renderHTML from "react-render-html";
import withWordpressData from "../withWordpressData";
import baseStyles from "../styles";
import moment from "moment";
import {
  Link,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  withStyles,
  Button,
} from "@material-ui/core";

function SinglePost({ loading, data, error, classes }) {
  const post = data[0] ? data[0] : null;
  return (
    <div className={classes.container}>
      {post ? (
        <Card className={classes.post} variant="outlined">
          <div key={post.id} className="" style={{ width: "50rem" }}>
            {/* Card Title */}
            <CardHeader title={post.title.rendered}></CardHeader>
            {/* Card Body */}
            <CardContent>
              <div>{renderHTML(post.content.rendered)}</div>
            </CardContent>
            {/* Card Footer */}
            <CardActions className={classes.actions}>
              <small>{moment(post.date).fromNow()} </small>
            </CardActions>
          </div>
        </Card>
      ) : (
        ""
      )}
      {loading && <img className="loader" src={loader}></img>}
      {error && <p>{error}</p>}
    </div>
  );
}

const SinglePostWithStyles = withStyles({
  container: baseStyles.container,
  post: {
    maxWidth: "50rem",
    minWidth: "300px",
    marginBottom: 30,
    "& figure": {
      height: "min-content",
    },
    "& img": {
      width: "100%",
      display: "block",
      objectFit: "contain",
      margin: "0 auto",
      marginBottom: 20,
    },
  },
  actions: {
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
  },
})((props) => {
  return <SinglePost {...props} />;
});

export default withWordpressData(SinglePostWithStyles);
