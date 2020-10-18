import React, { Component } from "react";
import { UserConsumer } from "../userContext";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <UserConsumer>
        {(user) => {
          const loginDetails = user.loginDetails;
          if (!loginDetails.token) {
            return <Redirect to="/login" />;
          }
          return (
            <div>
              <h2>Welcome {loginDetails.username}</h2>
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}

export default Dashboard;
