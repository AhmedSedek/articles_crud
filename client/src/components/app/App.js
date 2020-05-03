import React from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import AllArticlesContainer from "components/article/AllArticlesContainer";
import DetailedArticle from "components/article/DetailedArticle";
import Login from "components/user/Login";
import Logout from "components/user/Logout";
import NoMatch from "./NoMatch";
import Signup from "components/user/Signup";
import TopBar from "components/app/TopBar";
import User from "components/user/User";

import store from "redux/store";
import LocalStorage from "LocalStorage";

class App extends React.Component {
  state = {
    loggedInUser: {},
  };

  constructor(props) {
    super(props);
    LocalStorage.subscribe(this.localStorageUpdated);
  }

  componentDidMount() {
    this.localStorageUpdated();
  }

  localStorageUpdated = () => {
    const loggedInUser = LocalStorage.getLoggedInUser();
    this.setState({ loggedInUser });
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
              <DetailedArticle
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
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route
            path='/signup'
            render={(props) => (
              <Signup {...props} loggedIn={this.isLoggedIn()} />
            )}
          />
          <Route exact path='/' render={() => <Redirect to='/articles' />} />
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
