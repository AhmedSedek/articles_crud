import React from "react";
import { v4 as uuid } from "uuid";

import { Route, Redirect, Switch } from "react-router-dom";
import { Provider, connect } from "react-redux";

import ArticlesContainer from "./ArticlesContainer";
import User from "./User";
import Login from "./Login";
import Logout from "./Logout";
import SignUp from "./SignUp";
import Article from "./Article";
import store from "../redux/store";
import { attemptLogin } from "../redux/actions";

const NoMatch = ({ location }) => (
  <div className='ui inverted red raised very padded text container segment'>
    <strong>Error!</strong> No route found matching:
    <div className='ui inverted black segment'>
      <code>{location.pathname}</code>
    </div>
  </div>
);

function mapStateToLoginProps(state) {
  return {
    loginStatus: state.login.loginStatus,
    error: state.login.error,
  };
}

function mapDispatchToLoginProps(dispatch) {
  return {
    onSubmit: (user) => dispatch(attemptLogin(user)),
  };
}

const ReduxLogin = connect(
  mapStateToLoginProps,
  mapDispatchToLoginProps
)(Login);

class App extends React.Component {
  state = {
    users: [],
    loggedInUser: [],
  };

  handleSignUpSubmit = (user) => {
    const newUser = { name: user.name, id: uuid() };
    this.setState({
      users: this.state.users.concat(newUser),
    });
  };

  render() {
    return (
      <Switch>
        <Route path='/articles/:articleId' component={Article} />
        <Route path='/articles' component={ArticlesContainer} />
        <Route path='/users/:userId' component={User} />
        <Route path='/login' component={ReduxLogin} />
        <Route path='/logout' component={Logout} />
        <Route path='/signup' component={SignUp} />
        <Route path='/' render={() => <Redirect to='/articles' />} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

class WrappedApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default WrappedApp;
