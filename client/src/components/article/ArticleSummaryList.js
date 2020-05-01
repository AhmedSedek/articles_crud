import React, { Component } from "react";

import ArticleSummary from "components/article/ArticleSummary";

class ArticleSummaryList extends Component {
  render() {
    return (
      <div className='ui main text container unstackable items'>
        {this.props.articles.map((article, idx) => (
          <ArticleSummary
            article={article}
            key={idx}
            showUser={this.props.showUser}
          />
        ))}
      </div>
    );
  }
}

export default ArticleSummaryList;
