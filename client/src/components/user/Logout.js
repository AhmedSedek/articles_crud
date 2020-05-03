import React from "react";
import { Redirect } from "react-router-dom";
import { attempLogout } from "redux/actions";
import { connect } from "react-redux";

class Logout extends React.Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    const redirectPath = this.props.location.state.from || "/";
    return <Redirect to={redirectPath} />;
  }
}

function mapDispatchToLogoutProps(dispatch) {
  return {
    onLogout: () => dispatch(attempLogout()),
  };
}

const ReduxLogout = connect((state) => ({}), mapDispatchToLogoutProps)(Logout);

export default ReduxLogout;
