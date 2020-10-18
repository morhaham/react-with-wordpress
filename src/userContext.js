import React from "react";

const userContext = React.createContext({ ...localStorage });
const UserConsumer = userContext.Consumer;

class UserProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginDetails: { ...JSON.parse(localStorage.getItem("user")) },
    };
  }

  logIn = ({ username, userNiceName, userEmail, token }) => {
    const loginDetails = {
      username: username,
      userNiceName: userNiceName,
      userEmail: userEmail,
      token: token,
    };
    localStorage.setItem("user", JSON.stringify(loginDetails));
    this.setState({
      loginDetails: loginDetails,
    });
  };

  logOut = () => {
    localStorage.clear();
    this.setState({
      loginDetails: null,
    });
  };

  render() {
    return (
      <userContext.Provider
        value={{
          loginDetails: { ...this.state.loginDetails },
          logIn: this.logIn,
          logOut: this.logOut,
        }}
      >
        {this.props.children}
      </userContext.Provider>
    );
  }
}

export { userContext, UserProvider, UserConsumer };
