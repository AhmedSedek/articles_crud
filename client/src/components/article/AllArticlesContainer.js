import React from "react";
import Client from "Client";
import ArticleSummaryList from "./ArticleSummaryList";

class AllArticlesContainer extends React.Component {
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
    console.log(this.props);
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
        <ArticleSummaryList articles={this.state.articles} showUser={true} />
      );
    }
  }
}
export default AllArticlesContainer;
