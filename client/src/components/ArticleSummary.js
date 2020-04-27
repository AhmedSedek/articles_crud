import React from "react";

import { Link } from "react-router-dom";

class ArticleSummary extends React.Component {
  render() {
    return (
      <div className='item'>
        <div className='middle aligned content'>
          <div className='header'>
            <Link to={`/articles/${this.props.article.id}`}>
              {this.props.article.title}
            </Link>
          </div>
          <div className='text'>
            <p>{this.props.article.content.substring(0, 300)}</p>
          </div>
          <div className='meta'>
            <Link to={`/users/${this.props.article.userId}`}>
              Author: {this.props.article.userId}
            </Link>
            Created @ {this.props.article.timeCreated}
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleSummary;
