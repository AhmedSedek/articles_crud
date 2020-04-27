import React from "react";
import { v4 as uuid } from "uuid";

import { Route, Redirect, Switch } from "react-router-dom";

import ArticlesContainer from "./ArticlesContainer";

const NoMatch = ({ location }) => (
  <div className='ui inverted red raised very padded text container segment'>
    <strong>Error!</strong> No route found matching:
    <div className='ui inverted black segment'>
      <code>{location.pathname}</code>
    </div>
  </div>
);

class App extends React.Component {
  state = {
    users: [],
    loggedInUser: [],
  };

  handleSignUpSubmit = (user) => {
    const newUser = { name: user.name, id: uuid() };
    this.setState(
      {
        users: this.state.users.concat(newUser),
      },
      () => console.log(this.state)
    );
  };

  render() {
    return (
      <div className='ui grid'>
        <div className='spacer row' />
        <div className='row'>
          <Switch>
            <Route path='/articles' component={ArticlesContainer} />
            <Route exact path='/' render={() => <Redirect to='/articles' />} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
