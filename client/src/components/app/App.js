import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Provider, connect } from "react-redux";

import User from "components/user/User";
import Login from "components/user/Login";
import Logout from "components/user/Logout";
import Signup from "components/user/Signup";
import DetailedArticle from "components/article/DetailedArticle";
import TopBar from "components/app/TopBar";
import store from "redux/store";

import {
  attemptLogin,
  attemptSignup,
  deleteArticle,
  fetchArticle,
  updateArticle,
} from "redux/actions";
import Client from "Client";
import AllArticlesContainer from "components/article/AllArticlesContainer";
import LocalStorage from "LocalStorage";

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
)(DetailedArticle);

class App extends React.Component {
  state = {
    loggedInUser: {},
  };

  constructor(props) {
    super(props);
    this.client = new Client();
    LocalStorage.addSubscriber(this.localStorageUpdated);
  }

  componentDidMount() {
    this.localStorageUpdated();
  }

  localStorageUpdated = () => {
    const loggedInUser = LocalStorage.getLoggedInUser();
    this.setState({ loggedInUser: loggedInUser ? loggedInUser : {} });
  };

  isLoggedIn = () => {
    return Object.keys(this.state.loggedInUser).length !== 0;
  };

  render() {
    return (
      <div>
        <Route
          path='/'
          render={(props) => <TopBar {...props} loggedIn={this.isLoggedIn()} />}
        />
        <Switch>
          <Route
            path='/articles/:articleId'
            render={(props) => (
              <ReduxArticle
                {...props}
                loggedInUserId={this.state.loggedInUser.id}
              />
            )}
          />
          <Route path='/articles' component={AllArticlesContainer} />
          <Route
            path='/users/:userId'
            render={(props) => (
              <User {...props} loggedInUser={this.state.loggedInUser} />
            )}
          />
          <Route
            path='/login'
            render={(props) => (
              <ReduxLogin {...props} loggedIn={this.isLoggedIn()} />
            )}
          />
          <Route
            path='/logout'
            render={() => (
              <Logout onLogout={() => LocalStorage.unsetLoggedInUser()} />
            )}
          />
          <Route
            path='/signup'
            render={(props) => (
              <ReduxSignup {...props} loggedIn={this.isLoggedIn()} />
            )}
          />
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

const NoMatch = ({ location }) => (
  <div className='ui inverted red raised very padded text container segment'>
    <strong>Error!</strong> No route found matching:
    <div className='ui inverted black segment'>
      <code>{location.pathname}</code>
    </div>
  </div>
);

export default WrappedApp;
