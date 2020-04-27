import React from "react";

import { Link } from "react-router-dom";

class ArticleSummary extends React.Component {
  render() {
    return (
      <div className='content'>
        <div className='header'>{this.props.article.title}</div>
        <div className='meta'>
          <Link to={`/users/${this.props.article.userId}`}>
            {this.props.article.userId}
          </Link>
          Created @ {this.props.article.timeCreated}
        </div>
      </div>
    );
  }
}

export default ArticleSummary;
