import React, { Component } from "react";

import ArticleSummary from "./ArticleSummary";
import Client from "../Client";

const ARTICLES_IDS = [
  "0a4a79cb-b06d-4cb1-883d-549a1e3b66d7",
  "a73c1d19-f32d-4aff-b470-cea4e792406a",
];

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
    this.client.getArticles(ARTICLES_IDS).then((articles) =>
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
