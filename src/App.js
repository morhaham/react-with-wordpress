import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./Style.css";
import Home from "./components/Home";
import SinglePost from "./components/SinglePost";
import withWordpressData from "./withWordpressData";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import { UserProvider } from "./userContext";
import { ThemeProvider } from "@material-ui/core";
import CreatePost from "./components/CreatePost";
import clientConfig from "./clientConfig";

console.log(clientConfig.wpSiteUrl);

const wpSiteUrl = clientConfig.wpSiteUrl;
const postsEndpoint = clientConfig.postsEndpoint;

class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <Router>
          <Header />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/dashboard/:userNiceName" component={Dashboard} />
            <Route
              path="/post/:id"
              render={(props) => (
                <SinglePost
                  endpoint={`${wpSiteUrl}${postsEndpoint}/${props.match.params.id}`}
                />
              )}
            />
            <Route
              path="/"
              render={(props) => (
                <Home endpoint={`${wpSiteUrl}${postsEndpoint}`} />
              )}
            />
          </Switch>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
