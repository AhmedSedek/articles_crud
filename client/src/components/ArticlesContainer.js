import React, { Component } from "react";

import ArticleSummary from "./ArticleSummary";
import Client from "../Client";

class ArticlesContainer extends Component {
  state = {
    fetched: false,
    articles: [],
  };

  constructor(props) {
    super(props);

    this.client = new Client();
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles = () => {
    this.client.getArticles().then((articles) =>
      this.setState({
        fetched: true,
        articles,
      })
    );
  };

  render() {
    if (!this.state.fetched) {
      return <div className='ui active centered inline loader' />;
    } else {
      return (
        <div className='ui main text container unstackable items'>
          {this.state.articles.map((article, idx) => (
            <ArticleSummary article={article} key={idx} />
          ))}
        </div>
      );
    }
  }
}

export default ArticlesContainer;
