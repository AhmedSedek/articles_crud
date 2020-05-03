import React from "react";
import * as moment from "moment";

import { Link, Redirect } from "react-router-dom";
import ArticleForm from "components/article/ArticleForm";
import { updateArticle, fetchArticle, deleteArticle } from "redux/actions";
import { connect } from "react-redux";
import Loader from "components/app/Loader";

class DetailedArticle extends React.Component {
  state = {
    article: {},
    showEditForm: false,
  };

  componentDidMount() {
    this.props.fetchArticle(this.props.match.params.articleId);
  }

  componentWillReceiveProps(props) {
    this.setState({
      article: props.article,
      showEditForm: false,
    });
  }

  openEditForm = () => {
    this.setState({
      showEditForm: true,
    });
  };

  handleFormSubmit = (newArticle) => {
    this.setState(
      (prevState) => ({
        article: {
          ...prevState.article,
          title: newArticle.title,
          content: newArticle.content,
          timeUpdated: Date.now(),
        },
        showEditForm: false,
      }),
      () => this.props.updateArticle(this.state.article)
    );
  };

  handleDeleteClick = () => {
    this.props.deleteArticle(this.state.article.id);
  };

  render() {
    if (this.state.article.notFound) {
      return <Redirect to='/' />;
    }
    if (
      this.state.article.articleStatus !== "SUCCEEDED" &&
      this.state.article.articleStatus !== "FAILED"
    ) {
      return <Loader />;
    }
    if (this.state.showEditForm) {
      return (
        <ArticleForm
          title={this.state.article.title}
          content={this.state.article.content}
          onFormSubmit={this.handleFormSubmit}
          onFormClose={() => this.setState({ showEditForm: false })}
        />
      );
    } else {
      return (
        <div className='ui main two column centered container grid'>
          <div className='column'>
            <div className='header'>
              <h1>{this.state.article.title}</h1>
            </div>
            <div className='meta'>
              Written by{" "}
              <Link to={`/users/${this.state.article.userId}`}>
                {this.state.article.username}{" "}
              </Link>
              <div className='meta'>
                Created {moment(this.state.article.timeCreated).fromNow()}
                <br />
                Modified {moment(this.state.article.timeUpdated).fromNow()}
                <br />
                <br />
              </div>
            </div>
            <div className='text'>
              <p>{this.state.article.content}</p>
            </div>
          </div>
          {this.props.loggedInUserId === this.state.article.userId ? (
            <div className='column'>
              <button
                onClick={this.openEditForm}
                className='ui basic blue button'
              >
                Edit
              </button>
              <button
                className='ui basic red button'
                onClick={this.handleDeleteClick}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      );
    }
  }
}

function mapStateToArticleProps(state) {
  return {
    article: state.article,
  };
}

function mapDispatchToArticleProps(dispatch) {
  return {
    fetchArticle: (articleId) => dispatch(fetchArticle(articleId)),
    updateArticle: (article) => dispatch(updateArticle(article)),
    deleteArticle: (articleId) => dispatch(deleteArticle(articleId)),
  };
}

const ReduxArticle = connect(
  mapStateToArticleProps,
  mapDispatchToArticleProps
)(DetailedArticle);

export default ReduxArticle;
