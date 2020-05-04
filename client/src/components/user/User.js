import React from "react";
import { UsersClient, ArticlesClient } from "Client";

import ArticleSummary from "components/article/ArticleSummary";
import ArticleForm from "components/article/ArticleForm";
import Loader from "components/ui/Loader";

class User extends React.Component {
  state = {
    id: "",
    username: "",
    email: "",
    articles: [],
    registeredSince: null,
    openAddForm: false,
    fetched: false,
  };

  constructor(props) {
    super(props);
    this.usersClient = new UsersClient();
    this.articlesClient = new ArticlesClient();
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.usersClient.getUserById({ userId }, (user) =>
      this.setState({
        id: user.id,
        registeredSince: user.registeredSince,
        username: user.username,
        email: user.email,
        fetched: true,
      })
    );
    this.fetchArticles();
  }

  fetchArticles = () => {
    const userId = this.props.match.params.userId;
    this.articlesClient.getUserArticles({ userId }, (res) => {
      this.setState({ articles: res });
    });
  };

  renderArticles = () => {
    return this.state.articles.map((article, idx) => (
      <ArticleSummary article={article} key={idx} />
    ));
  };

  openAddForm = () => {
    this.setState({ openAddForm: true });
  };

  handleFormSubmit = (newArticle) => {
    this.articlesClient
      .createArticle({
        ...newArticle,
        userId: this.props.loggedInUser.id,
        username: this.props.loggedInUser.username,
      })
      .then(this.fetchArticles);
    this.setState({ openAddForm: false });
  };

  handleFormClose = () => {
    this.setState({ openAddForm: false });
  };

  render() {
    if (!this.state.fetched) return <Loader />;
    return (
      <div className='ui main two column gridcentered container '>
        <div className='four wide column'>
          <h1>{this.state.username}</h1>
          <div className='meta'>
            Registered at @{this.state.registeredSince}
            <br />
            Email: {this.state.email}
          </div>
        </div>
        <div className='eight wide column'>
          <div className='ui main text container unstackable items'>
            {this.props.loggedInUser.id === this.state.id ? (
              <button
                className='ui basic button blue'
                onClick={this.openAddForm}
              >
                Add Article
              </button>
            ) : null}
            {this.state.openAddForm ? (
              <ArticleForm
                onFormClose={this.handleFormClose}
                onFormSubmit={this.handleFormSubmit}
              />
            ) : (
              this.renderArticles()
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default User;
