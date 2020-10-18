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
import Navbar from "./components/Navbar";
import { UserProvider } from "./userContext";

const wpSiteUrl = "http://morhaham.local";
const postsEndpoint = "/wp-json/wp/v2/posts";

const SinglePostWithData = withWordpressData(SinglePost);
const HomeWithPostsData = withWordpressData(Home);

class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/dashboard/:userNiceName" component={Dashboard} />
            <Route
              path="/post/:id"
              render={(props) => (
                <SinglePostWithData
                  endpoint={`${wpSiteUrl}${postsEndpoint}/${props.match.params.id}`}
                />
              )}
            />
            <Route
              path="/"
              render={(props) => (
                <HomeWithPostsData endpoint={`${wpSiteUrl}${postsEndpoint}`} />
              )}
            />
          </Switch>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
