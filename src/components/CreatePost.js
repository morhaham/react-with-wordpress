import {
  Button,
  Input,
  InputLabel,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import loader from "../loader.svg";
import { userContext } from "../userContext";
import clientConfig from "../clientConfig";
import axios from "axios";
import sanitizeHtml from "sanitize-html";

class CreatePost extends React.Component {
  static contextType = userContext;
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      postCreated: false,
      loading: false,
      message: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {
      title: this.state.title,
      content: this.state.content,
      status: "publish",
    };
    const { loginDetails } = this.context;
    const wpSiteUrl = clientConfig.wpSiteUrl;
    const endpoint = clientConfig.postsEndpoint;
    const authToken = loginDetails.token;

    axios
      .post(`${wpSiteUrl}${endpoint}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          loading: false,
          postCreated: !!res.data.id,
          message: res.data.id ? "New post created" : "",
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
          message: error.response.data.message,
        });
      });
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createMarkup = (data) => ({
    __html: data,
  });

  render() {
    const { classes } = this.props;
    const { title, content, postCreated, loading, message } = this.state;
    return (
      <div>
        <Typography gutterBottom variant="h4">
          Create Post
        </Typography>
        {message && <Alert severity="info">{sanitizeHtml(message)}</Alert>}
        <form className={classes.form}>
          <TextField
            name="title"
            onChange={this.handleInputChange}
            value={title}
            variant="outlined"
            margin="dense"
            required
            type="text"
            placeholder="title.."
          />
          <TextField
            name="content"
            onChange={this.handleInputChange}
            value={content}
            margin="dense"
            required
            variant="outlined"
            placeholder="Post Content.."
            fullWidth
            multiline
            columns="10"
            rows="7"
          />
          <Button
            disabled={loading}
            onClick={this.handleSubmit}
            className={classes.submit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
        {loading && <img src={loader} />}
      </div>
    );
  }
}

const compWithStyles = withStyles({
  submit: {
    marginTop: 20,
  },
})((props) => <CreatePost {...props} />);

export default compWithStyles;
