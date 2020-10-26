import React from "react";
import { Link as RouterLink } from "react-router-dom";
import renderHTML from "react-render-html";
import loader from "../loader.svg";
import withWordpressData from "../withWordpressData";
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
import baseStyles from "../styles";

const LinkBehavior = React.forwardRef((props, ref) => {
  return <RouterLink ref={ref} to={props.to} {...props} />;
});

function Home({ loading, data, error, classes }) {
  const posts = [...data];
  return (
    <>
      {error && <div>{error}</div>}
      <div className={classes.container}>
        {posts.length
          ? posts.map((post) => (
              <Card key={post.id} className={classes.post} variant="outlined">
                {/* Card Title */}
                <Link component={LinkBehavior} to={`/post/${post.id}`}>
                  <CardHeader title={post.title.rendered}></CardHeader>
                </Link>
                {/* Card Body */}
                <CardContent>
                  <div>{renderHTML(post.excerpt.rendered)}</div>
                </CardContent>
                {/* Card Footer */}
                <CardActions className={classes.actions}>
                  <small>{moment(post.date).fromNow()} </small>
                  <Button component={LinkBehavior} to={`/post/${post.id}`}>
                    Read More..
                  </Button>
                </CardActions>
              </Card>
            ))
          : ""}
        {loading && <img className="loader" src={loader} alt="loading" />}
      </div>
    </>
  );
}

const HomeWithStyles = withStyles({
  container: baseStyles.container,
  post: {
    maxWidth: "50rem",
    minWidth: "300px",
    marginBottom: 30,
  },
  actions: {
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
  },
})((props) => {
  return <Home {...props} />;
});

export default withWordpressData(HomeWithStyles);
