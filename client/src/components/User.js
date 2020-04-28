import React from "react";
import Client from "../Client";

import ArticleSummary from "./ArticleSummary";

class User extends React.Component {
  state = {
    id: "",
    username: "",
    articles: [],
    registeredSince: null,
  };

  constructor(props) {
    super(props);

    this.client = new Client();
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.client.getUserById({ userId }, (res) =>
      this.setState({
        id: res.id,
        registeredSince: res.registeredSince,
        username: res.username,
      })
    );
    this.client.getUserArticles({ userId }, (res) => {
      this.setState({ articles: res });
    });
  }

  render() {
    return (
      <div className='item content'>
        <div className='header'>
          <h1>{this.state.username}</h1>
        </div>
        <div className='meta'>Registered at @{this.state.registeredSince}</div>
        <div className='ui main text container unstackable items'>
          {this.state.articles.map((article, idx) => (
            <ArticleSummary article={article} key={idx} />
          ))}
        </div>
      </div>
    );
  }
}

export default User;
