import React from "react";
import Client from "../Client";

import { Link } from "react-router-dom";

class Article extends React.Component {
  state = {
    title: "",
    timeCreated: null,
    timeUpdated: null,
    id: "",
    content: "",
    userId: "",
  };

  constructor(props) {
    super(props);

    this.client = new Client();
  }

  componentDidMount() {
    const articleId = this.props.match.params.articleId;
    this.client.getArticle({ articleId }, (res) =>
      this.setState({
        title: res.title,
        timeCreated: res.timeCreated,
        timeUpdated: res.timeUpdated,
        id: res.id,
        content: res.content,
        userId: res.userId,
      })
    );
  }

  render() {
    return (
      <div className='item content'>
        <div className='header'>
          <h1>{this.state.title}</h1>
        </div>
        <div className='meta'>
          Written by{" "}
          <Link to={`/users/${this.state.userId}`}>{this.state.userId} </Link>@{" "}
          {this.state.timeCreated}
          <br />
          Last Modified @ {this.state.timeUpdated}
          <br />
        </div>
        <div className='text'>
          <p>{this.state.content}</p>
        </div>
      </div>
    );
  }
}

export default Article;
