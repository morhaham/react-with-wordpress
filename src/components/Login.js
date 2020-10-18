import axios from "axios";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import loader from "../loader.svg";
import { userContext } from "../userContext";
import renderHTML from "react-render-html";

class Login extends Component {
  static contextType = userContext;
  constructor(props) {
    super(props);
    this.user = null;
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
          this.setState({
            loading: false,
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
    return (
      <div className="d-flex flex-column align-items-center mt-5 mb-3">
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="" className="form-group">
            Username:
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={this.handleOnChange}
            />
          </label>
          <br />
          <label htmlFor="" className="form-group">
            Password:
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={this.handleOnChange}
            />
          </label>
          <br />
          <button
            className="btn btn-primary mb-3 d-block mx-auto"
            type="submit"
          >
            Login
          </button>
        </form>
        {loading && <img src={loader}></img>}
        {error && <p className="alert-danger">{renderHTML(error)}</p>}
      </div>
    );
  }
}

export default Login;
