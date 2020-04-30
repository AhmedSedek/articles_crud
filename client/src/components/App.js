import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";
import { Provider, connect } from "react-redux";

import ArticlesContainer from "./ArticlesContainer";
import User from "./User";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import Article from "./Article";
import store from "../redux/store";
import {
  attemptLogin,
  attemptSignup,
  deleteArticle,
  fetchArticle,
  logoutRequest,
  updateArticle,
} from "../redux/actions";
import TopBar from "./TopBar";

export const NoMatch = ({ location }) => (
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

function mapDispatchToLogoutProps(dispatch) {
  return {
    onLogout: () => dispatch(logoutRequest()),
  };
}

const ReduxLogout = connect((state) => ({}), mapDispatchToLogoutProps)(Logout);

function mapStateToTopBarProps(state) {
  return {
    loggedIn: Object.keys(state.login.loggedInUser).length !== 0,
  };
}

const ReduxTopBar = connect(mapStateToTopBarProps, (dispatch) => ({}))(TopBar);

function mapStateToSignupProps(state) {
  return {
    signupStatus: state.signup.signupStatus,
    error: state.signup.error,
  };
}

function mapDispatchToSignupProps(dispatch) {
  return {
    onSubmit: (user) => dispatch(attemptSignup(user)),
  };
}

const ReduxSignup = connect(
  mapStateToSignupProps,
  mapDispatchToSignupProps
)(Signup);

function mapStateToArticleProps(state) {
  return {
    article: state.article,
    loggedInUserId: state.login.loggedInUser.id,
  };
}

function mapDispatchToArticleProps(dispatch) {
  return {
    fetchArticle: (articleId) => dispatch(fetchArticle(articleId)),
    updateArticle: (article) => dispatch(updateArticle(article)),
    deleteArticle: (articleId) => dispatch(deleteArticle(articleId)),
  };
}

const ReduxArticle = connect(
  mapStateToArticleProps,
  mapDispatchToArticleProps
)(Article);

function mapStateToUserProps(state) {
  return {
    loggedInUserId: state.login.loggedInUser.id
  };
}

const ReduxUser = connect(mapStateToUserProps, (dispatch) => ({}))(User);

class App extends React.Component {
  render() {
    return (
      <div>
        <Route path='/' component={ReduxTopBar} />
        {/* <ReduxTopBar /> */}
        <Switch>
          <Route path='/articles/:articleId' component={ReduxArticle} />
          <Route path='/articles' component={ArticlesContainer} />
          <Route path='/users/:userId' component={ReduxUser} />
          <Route path='/login' component={ReduxLogin} />
          <Route path='/logout' component={ReduxLogout} />
          <Route path='/signup' component={ReduxSignup} />
          <Route path='/' render={() => <Redirect to='/articles' />} />
          <Route component={NoMatch} />
        </Switch>
      </div>
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
