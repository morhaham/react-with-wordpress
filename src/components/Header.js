import { Link, withStyles, Button, Box, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { UserConsumer } from "../userContext";

const LinkBehavior = React.forwardRef((props, ref) => {
  return <RouterLink ref={ref} to={props.to} {...props} />;
});

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const classes = this.props.classes;
    return (
      <UserConsumer>
        {(user) => (
          <div className={classes.header}>
            <Typography variant="h5">React With Wordpress</Typography>
            <nav>
              <NavButton
                component={LinkBehavior}
                exact
                activeClassName={classes.active}
                to="/"
              >
                Home
              </NavButton>
              {user.loginDetails.token ? (
                <NavButton
                  component={LinkBehavior}
                  to="/login"
                  onClick={user.logOut}
                >
                  Log Out
                </NavButton>
              ) : (
                <NavButton
                  component={LinkBehavior}
                  activeClassName={classes.active}
                  to="/login"
                >
                  Login
                </NavButton>
              )}
              <NavButton
                component={LinkBehavior}
                exact
                activeClassName={classes.active}
                to={`/dashboard/${user.loginDetails.userNiceName}`}
              >
                Dashboard
              </NavButton>
            </nav>
          </div>
        )}
      </UserConsumer>
    );
  }
}

const NavButton = withStyles({
  root: {
    color: "#fafafa",
    marginRight: 15,
  },
})(Button);

const HeaderWithStyles = withStyles((theme) => ({
  header: {
    color: "#fafafa",
    display: "flex",
    padding: "0 20px",
    alignItems: "center",
    height: 60,
    backgroundColor: "#373a40",
    "&>h5": {
      flex: 1,
      fontWeight: 200,
    },
  },
  active: {
    backgroundColor: "#fafafa",
    color: theme.palette.getContrastText("#fafafa"),
    "&:hover, &:link": {
      backgroundColor: "#fafafa",
      color: theme.palette.getContrastText("#fafafa"),
    },
  },
}))((props) => <Header {...props} />);

export default HeaderWithStyles;
