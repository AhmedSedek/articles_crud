import React from "react";
import { ArticlesClient } from "Client";
import ArticleSummaryList from "./ArticleSummaryList";
import Loader from "components/ui/Loader";

class AllArticlesContainer extends React.Component {
  state = {
    fetched: false,
    articles: [],
  };

  constructor(props) {
    super(props);
    this.client = new ArticlesClient();
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
      return <Loader />;
    } else {
      return (
        <ArticleSummaryList articles={this.state.articles} showUser={true} />
      );
    }
  }
}
export default AllArticlesContainer;
