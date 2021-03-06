import React, { Component } from "react";
import { Link } from "@reach/router";
import moment from "moment";
import SortArticles from "./SortArticles";
import * as api from "../utils/api";
import Voter from "./Voter";
import Loader from "./Loader";

class ArticlesList extends Component {
  state = {
    articles: [],
    isLoading: true,
    type: "articles",
    hasError: false,
  };

  componentDidMount() {
    this.fetchAllArticles();
  }

  fetchAllArticles = (sort_by, order) => {
    const topic = this.props.topic_slug;
    api
      .fetchArticles(topic, sort_by, order)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
      })
      .catch((err) => {
        this.setState({ hasError: true });
      });
  };

  render() {
    const { articles, isLoading, hasError } = this.state;
    if (hasError) return <p className="topics-error">"Topic does not exist"</p>;
    if (isLoading) return <Loader />;
    return (
      <div className="all-articles">
        <br />
        <SortArticles
          fetchAllArticles={this.fetchAllArticles}
          handleOrder={this.handleOrder}
        />
        <ul>
          {articles.map((article) => {
            return (
              <li key={article.article_id}>
                <Link to={`/articles/${article.article_id}`}>
                  <h5>
                    {article.title}
                    <br />
                    <br />
                    Topic: {article.topic}
                  </h5>
                </Link>
                <p>
                  This article was created by {article.author} on{" "}
                  {moment(article.created_at).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
                <p>
                  Currently{" "}
                  <Link to={`/articles/${article.article_id}`}>
                    {article.comment_count}
                  </Link>{" "}
                  comments have been left for this article
                </p>
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
