import React from "react";
import { Provider } from "react-redux";

import store from "redux/store";
import LocalStorage from "LocalStorage";
import AppRouter from "components/router/AppRouter";
import TopBar from "components/topbar/TopBar";

class App extends React.Component {
  state = {
    loggedInUser: {},
  };

  constructor(props) {
    super(props);
    LocalStorage.getInstance().subscribe(this.localStorageUpdated);
  }

  componentDidMount() {
    this.localStorageUpdated();
  }

  localStorageUpdated = () => {
    const loggedInUser = LocalStorage.getInstance().getLoggedInUser();
    this.setState({ loggedInUser });
  };

  isLoggedIn = () => {
    return Object.keys(this.state.loggedInUser).length !== 0;
  };

  render() {
    return (
      <Provider store={store}>
        <TopBar
          loggedIn={this.isLoggedIn()}
          loggedInUser={this.state.loggedInUser}
        />
        <AppRouter
          isLoggedIn={this.isLoggedIn}
          loggedInUser={this.state.loggedInUser}
        />
      </Provider>
    );
  }
}

export default App;
