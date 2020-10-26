import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import loader from "../loader.svg";
import { userContext } from "../userContext";
import renderHTML from "react-render-html";
import { Input, InputLabel, Button, withStyles } from "@material-ui/core";
import baseStyles from "../styles";

class Login extends Component {
  static contextType = userContext;
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      error: "",
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const siteUrl = "http://morhaham.local";
    const { username, password } = this.state;
    const loginData = {
      username: username,
      password: password,
    };
    this.setState({ loading: true }, () => {
      axios
        .post(`${siteUrl}/wp-json/jwt-auth/v1/token`, loginData)
        .then((res) => {
          console.log(res.data);
          if (res.data.token === undefined) {
            this.setState({
              loading: false,
              error: res.data.message,
            });
            return;
          }
          this.context.logIn({
            token: res.data.token,
            username: res.data.user_display_name,
            userNiceName: res.data.user_display_name,
            userEmail: res.data.user_email,
          });
        })
        .catch((error) => {
          console.log(error.response.data);
          this.setState({
            error: error.response.data.message,
            loading: false,
          });
        });
    });
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    if (this.context.loginDetails.token) {
      return (
        <Redirect to={`/dashboard/${this.context.loginDetails.userNiceName}`} />
      );
    }
    const { username, password, loading, error } = this.state;
    const classes = this.props.classes;
    return (
      <div className={classes.container}>
        <form className={classes.loginForm} onSubmit={this.onFormSubmit}>
          <div className={classes.inputContainer}>
            <InputLabel htmlFor="username">Username:</InputLabel>
            <Input
              autoFocus={true}
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={this.handleOnChange}
            />
          </div>
          <br />
          <div className={classes.inputContainer}>
            <InputLabel htmlFor="password">Password:</InputLabel>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={this.handleOnChange}
            />
            <br />
          </div>
          <Button color="primary" type="submit">
            Login
          </Button>
        </form>
        {loading && <img src={loader}></img>}
        {error && <p className={classes.error}>{renderHTML(error)}</p>}
      </div>
    );
  }
}

const LoginWithStyles = withStyles({
  container: baseStyles.container,
  inputContainer: {
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 10,
  },
})((props) => <Login {...props} />);

export default LoginWithStyles;
