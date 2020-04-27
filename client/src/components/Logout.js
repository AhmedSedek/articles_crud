import React from "react";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  componentDidMount() {
    // reset the logged in user.
  }
  render() {
    return <Redirect to='/login' />;
  }
}

export default Logout;
