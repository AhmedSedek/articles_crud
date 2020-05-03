import React from "react";

import { Link } from "react-router-dom";

class TopBar extends React.Component {
  render() {
    return (
      <div className='ui huge top attached fluid secondary menu'>
        <div className='item'>
          <Link
            className='ui green header'
            style={{ marginTop: "10px" }}
            to='/'
          >
            Articles CRUD
          </Link>
        </div>
        <div className='right menu'>
          {this.props.loggedIn ? (
            <Link
              className='ui item'
              to={{
                pathname: "/logout",
                state: { from: this.props.location.pathname },
              }}
            >
              Logout
            </Link>
          ) : null}
          {!this.props.loggedIn && this.props.location.pathname !== "/login" ? (
            <Link
              className='ui item'
              to={{
                pathname: "/login",
                state: { from: this.props.location.pathname },
              }}
            >
              Login
            </Link>
          ) : null}
          {!this.props.loggedIn &&
          this.props.location.pathname !== "/signup" ? (
            <Link
              className='ui item'
              to={{
                pathname: "/signup",
                state: { from: this.props.location.pathname },
              }}
            >
              Signup
            </Link>
          ) : null}
        </div>
      </div>
    );
  }
}

export default TopBar;
