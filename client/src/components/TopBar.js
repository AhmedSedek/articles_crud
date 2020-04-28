import React from "react";

import { Link } from "react-router-dom";

class TopBar extends React.Component {
  render() {
    return (
      <div className='ui huge top attached fluid secondary menu'>
        <div className='item' />
        <div className='item'>
          <h1 className='ui green header' style={{ marginTop: "10px" }}>
            Articles CRUD
          </h1>
        </div>
        <div className='right menu'>
          {this.props.loggedIn ? (
            <Link className='ui item' to='/logout'>
              Logout
            </Link>
          ) : null}
          {!this.props.loggedIn && this.props.location.pathname !== "/login" ? (
            <Link className='ui item' to='/login'>
              Login
            </Link>
          ) : null}
          {!this.props.loggedIn && this.props.location.pathname !== "/signup" ? (
            <Link className='ui item' to='/signup'>
              Signup
            </Link>
          ) : null}
        </div>
      </div>
    );
  }
}

export default TopBar;
