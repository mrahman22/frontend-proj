import React, { Component } from "react";
import { Link } from "@reach/router";
import moment from "moment";
import SortArticles from "./SortArticles";
import * as api from "../utils/api";
import Voter from "./Voter";

class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
    type: "articles",
    hasError: false,
  };

  componentDidMount() {
    console.log(this.props.path === "/topics/:topic_slug");
    this.fetchAllArticles();
  }

  fetchAllArticles = () => {
    const topic = this.props.topic_slug;
    api
      .fetchArticles(topic)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
      })
      .catch((err) => {
        this.setState({ hasError: true });
      });
  };

  handleSort = (value) => {
    api.sortArticles(value).then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  };

  render() {
    const path = this.props.path;
    const { articles, isLoading, hasError } = this.state;
    if (hasError) return <p className="topics-error">"Topic does not exist"</p>;
    if (isLoading) return "....Loading";
    return (
      <div className="all-articles">
        <br />
        {path !== "/topics/:topic_slug" && (
          <SortArticles handleSort={this.handleSort} />
        )}
        <ul>
          {articles.map((article) => {
            return (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  <h5>{article.title}</h5>
                </Link>
                <p>user: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>
                  Created at:{" "}
                  {moment(article.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
                <p>Comment Count: {article.comment_count}</p>
                <Voter
                  votes={article.votes}
                  id={article.article_id}
                  type={this.state.type}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ArticlesList;
