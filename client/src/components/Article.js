import React from "react";
import Client from "../Client";

import { Link } from "react-router-dom";

class Article extends React.Component {
  state = {
    article: {},
    showEditForm: false,
  };

  constructor(props) {
    super(props);
    this.client = new Client();
  }

  componentDidMount() {
    this.props.fetchArticle(this.props.match.params.articleId);
  }

  componentWillReceiveProps(props) {
    console.log('I"m receiving new shit');
    this.setState({
      article: props.article,
      showEditForm: false,
    });
  }

  openEditForm = () => {
    console.log("Editing form?");
    this.setState({
      showEditForm: true,
    });
  };

  handleDeleteClick = () => {};

  render() {
    console.log(this.props);
    return (
      <div className='ui main two column centered container grid'>
        <div className='column'>
          <div className='header'>
            <h1>{this.state.article.title}</h1>
          </div>
          <div className='meta'>
            Written by{" "}
            <Link to={`/users/${this.state.article.userId}`}>
              {this.state.article.userId}{" "}
            </Link>
            @ {this.state.article.timeCreated}
            <br />
            Last Modified @ {this.state.article.timeUpdated}
            <br />
          </div>
          <div className='text'>
            <p>{this.state.article.content}</p>
          </div>
        </div>
        {this.props.loggedInUserId === this.state.article.userId ? (
          <div className='column'>
            <input type='button' onClick={this.openEditForm} value='Edit' />
            <input
              type='button'
              onClick={this.handleDeleteClick}
              value='Delete'
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Article;
