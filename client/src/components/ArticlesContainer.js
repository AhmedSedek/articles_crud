import React, { Component } from "react";

import { Route } from "react-router-dom";

import Article from "./Article";
import ArticleSummary from "./ArticleSummary";
// import VerticalMenu from "./VerticalMenu";
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
      const matchPath = this.props.match.path;

      return (
        <div className='ui centered'>
          {this.state.articles.map((article, idx) => (
            <ArticleSummary article={article} key={idx} />
          ))}
          {/* <div className='ui ten wide column'> */}
          {/* <Route
              exact
              path={matchPath}
              render={() => (
                <div>
                  <h3>Please select an album on the left</h3>
                </div>
              )}
            /> */}
          {/* <Route
              path={`${matchPath}/:albumId`}
              render={({ match }) => {
                const article = this.state.articles.find(
                  (a) => a.id === match.params.articleId
                );
                return (
                  <ArticleSummary
                    article={article}
                    articlesPathname={matchPath}
                  />
                );
              }}
            /> */}
          {/* </div> */}
        </div>
      );
    }
  }
}

export default ArticlesContainer;
