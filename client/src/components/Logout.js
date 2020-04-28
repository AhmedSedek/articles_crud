import React from "react";
import { Redirect } from "react-router-dom";

import store from "../redux/store";

class Logout extends React.Component {
  componentDidMount() {
    // reset the logged in user.
    store.dispatch({
      type: "LOGOUT",
    });
  }
  render() {
    return <Redirect to='/login' />;
  }
}

export default Logout;
