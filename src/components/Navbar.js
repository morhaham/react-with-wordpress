import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { UserConsumer } from "../userContext";

export class Navbar extends Component {
  render() {
    return (
      <UserConsumer>
        {(user) => (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div id="navbarColor02">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    className="nav-link"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  {user.loginDetails.token ? (
                    <NavLink
                      className="nav-link"
                      to="/login"
                      onClick={user.logOut}
                    >
                      Log Out
                    </NavLink>
                  ) : (
                    <NavLink
                      exact
                      activeClassName="active"
                      className="nav-link"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  )}
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    className="nav-link"
                    to={`/dashboard/${user.loginDetails.userNiceName}`}
                  >
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </UserConsumer>
    );
  }
}

export default Navbar;
