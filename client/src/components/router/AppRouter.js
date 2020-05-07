import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AllArticlesContainer from "components/article/AllArticlesContainer";
import DetailedArticle from "components/article/DetailedArticle";
import Login from "components/user/Login";
import Logout from "components/user/Logout";
import Signup from "components/user/Signup";
import User from "components/user/User";
import NoMatch from "components/ui/NoMatch";

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            path='/articles/:articleId'
            render={(props) => (
              <DetailedArticle
                {...props}
                loggedInUserId={this.props.loggedInUser.id}
              />
            )}
          />
          <Route path='/articles' component={AllArticlesContainer} />
          <Route
            path='/users/:userId'
            render={(props) => (
              <User {...props} loggedInUser={this.props.loggedInUser} />
            )}
          />
          <Route
            path='/login'
            render={(props) => (
              <Login {...props} loggedIn={this.props.isLoggedIn()} />
            )}
          />
          <Route path='/logout' component={Logout} />
          <Route
            path='/signup'
            render={(props) => (
              <Signup {...props} loggedIn={this.props.isLoggedIn()} />
            )}
          />
          <Route exact path='/' render={() => <Redirect to='/articles' />} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default AppRouter;
