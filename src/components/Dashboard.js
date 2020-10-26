import React, { Component } from "react";
import { UserConsumer } from "../userContext";
import CreatePost from "./CreatePost";
import {
  Redirect,
  NavLink as RouterLink,
  Route,
  Switch,
} from "react-router-dom";
import {
  List,
  ListItemText,
  ListItem,
  Collapse,
  ListSubheader,
  withStyles,
  Typography,
  Input,
  InputLabel,
  TextareaAutosize,
  TextField,
  Button,
} from "@material-ui/core";

const LinkBehavior = React.forwardRef((props, ref) => {
  return <RouterLink ref={ref} {...props} />;
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPosts: false,
      openPages: false,
      openUsers: false,
      openMedia: false,
      selectedIndex: -1,
    };
  }

  componentDidUpdate() {
    console.log("updated");
  }
  componentDidMount() {
    console.log("mounted");
  }

  handleClick = (e, index) => {
    const initialOpenState = {
      openPosts: false,
      openPages: false,
      openUsers: false,
      openMedia: false,
    };
    switch (index) {
      case 0:
        this.setState((prevState) => ({
          ...initialOpenState,
          openPosts: !prevState.openPosts,
          selectedIndex: prevState.openPosts ? -1 : 0,
        }));
        break;
      case 1:
        this.setState((prevState) => ({
          ...initialOpenState,
          openPages: !prevState.openPages,
          selectedIndex: prevState.openPages ? -1 : 1,
        }));
        break;
      case 2:
        this.setState((prevState) => ({
          ...initialOpenState,
          openMedia: !prevState.openMedia,
          selectedIndex: prevState.openMedia ? -1 : 2,
        }));
        break;
      case 3:
        this.setState((prevState) => ({
          ...initialOpenState,
          openUsers: !prevState.openUsers,
          selectedIndex: prevState.openUsers ? -1 : 3,
        }));
        break;
      default:
        this.setState({
          ...initialOpenState,
          selectedIndex: -1,
        });
    }
  };

  render() {
    const { classes } = this.props;
    const { selectedIndex } = this.state;
    return (
      <UserConsumer>
        {(user) => {
          console.log(user);
          const loginDetails = user.loginDetails;
          if (!loginDetails.token) {
            return <Redirect to="/login" />;
          }
          return (
            <div className={classes.dashboard}>
              <div className={classes.sidebar}>
                <List
                  className={classes.nav}
                  component="nav"
                  subheader={
                    <ListSubheader component="small">
                      Welcome <strong>{loginDetails.username}</strong>
                    </ListSubheader>
                  }
                >
                  <ListItem
                    button
                    selected={selectedIndex === 0}
                    onClick={(e) => this.handleClick(e, 0)}
                  >
                    <ListItemText primary="Posts" />
                  </ListItem>
                  <Collapse
                    in={this.state.openPosts}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItem
                        button
                        component={LinkBehavior}
                        to="/dashboard/createPost"
                        className={classes.nested}
                        // onClick={this.handleClick}
                      >
                        <ListItemText primary="Add New" />
                      </ListItem>
                    </List>
                  </Collapse>
                  <ListItem
                    button
                    selected={selectedIndex === 1}
                    onClick={(e) => this.handleClick(e, 1)}
                  >
                    <ListItemText primary="Pages" />
                  </ListItem>
                  <Collapse
                    in={this.state.openPages}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Starred" />
                      </ListItem>
                    </List>
                  </Collapse>
                  <ListItem
                    button
                    selected={selectedIndex === 2}
                    onClick={(e) => this.handleClick(e, 2)}
                  >
                    <ListItemText primary="Media" />
                  </ListItem>
                  <Collapse
                    in={this.state.openMedia}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Starred" />
                      </ListItem>
                    </List>
                  </Collapse>
                  <ListItem
                    button
                    selected={selectedIndex === 3}
                    onClick={(e) => this.handleClick(e, 3)}
                  >
                    <ListItemText primary="Users" />
                  </ListItem>
                  <Collapse
                    in={this.state.openUsers}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested}>
                        <ListItemText primary="Starred" />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
              </div>

              <div className={classes.main}>
                <Switch>
                  <Route path="/dashboard/createPost">
                    <CreatePost />
                  </Route>
                  <Typography className={classes.mainTitle}>Hello</Typography>
                </Switch>
              </div>
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}

const DashboardWithStyles = withStyles((theme) => ({
  dashboard: {
    display: "flex",
  },
  sidebar: {
    flex: "0.2",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#edc988",
    color: theme.palette.getContrastText("#edc988"),
  },
  nav: {
    borderBottom: "1px solid rgba(0,0,0,.1)",
    "& *": {
      fontWeight: "bold",
    },
  },
  active: {
    fontWeight: "bolder",
  },
  main: {
    padding: 50,
    flex: "0.8",
  },
  mainTitle: {
    marginBottom: 20,
  },
  form: {
    "&>.inputContainer": {
      marginBottom: 50,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))((props) => <Dashboard {...props} />);

export default DashboardWithStyles;
