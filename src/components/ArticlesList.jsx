import React, { Component } from "react";
import { Link } from "@reach/router";
import SortArticles from "./SortArticles";
import * as api from "../utils/api";
import Voter from "./Voter";

class ArticlesList extends Component {
  state = {
    articles: [],
    articlesByTopic: [],
    isLoading: true,
    type: "articles",
  };

  componentDidMount() {
    this.fetchAllArticles();
  }

  fetchAllArticles = () => {
    const topic = this.props.location.search.slice(1);
    api.fetchArticles(topic).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  };

  handleSort = (value) => {
    api.sortArticles(value).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  };

  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return "....Loading";
    return (
      <div className="all-articles">
        <SortArticles handleSort={this.handleSort} />

        <ul>
          {articles.map((article) => {
            return (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  <h2>{article.title}</h2>
                </Link>
                <p>user: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Created_at: {article.created_at}</p>
                {/* <p>Votes: {article.votes}</p> */}
                {/* <Link to={`${article.article_id}/comments`}> */}
                <p>Comment_Count: {article.comment_count}</p>
                <Voter
                  votes={article.votes}
                  id={article.article_id}
                  type={this.state.type}
                />
                {/* </Link> */}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ArticlesList;
