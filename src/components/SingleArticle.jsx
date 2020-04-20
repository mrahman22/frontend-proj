import React, { Component } from "react";
import * as api from "../utils/api";
import moment from "moment";
import Comments from "./Comments";
import Voter from "./Voter";
import Loader from "./Loader";

class SingleArticle extends Component {
  state = {
    selectedArticle: [],
    isLoading: true,
    type: "articles",
    hasError: false,
  };

  componentDidMount() {
    this.getArticleById();
  }

  getArticleById = () => {
    const { article_id } = this.props;
    api
      .fetchArticleById(article_id)
      .then((selectedArticle) => {
        this.setState({ selectedArticle, isLoading: false });
      })
      .catch((err) => {
        this.setState({ hasError: true });
      });
  };

  render() {
    const { loggedInUser } = this.props;
    const { selectedArticle, isLoading, hasError } = this.state;
    if (hasError)
      return <p className="article-error">"article id does not exist"</p>;
    if (isLoading) return <Loader />;
    return (
      <div>
        <section className="single-article">
          <h2>{selectedArticle.title}</h2>
          <p>Author: {selectedArticle.author}</p>
          <p>Topic: {selectedArticle.topic}</p>
          <p>
            Created_at:{" "}
            {moment(selectedArticle.created_at).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}
          </p>
          <p>Body: {selectedArticle.body}</p>
          <p>Comment Count: {selectedArticle.comment_count}</p>
          <Voter
            votes={selectedArticle.votes}
            id={selectedArticle.article_id}
            type={this.state.type}
          />
        </section>
        <Comments
          loggedInUser={loggedInUser}
          comments={this.state.comments}
          article_id={selectedArticle.article_id}
        />
      </div>
    );
  }
}

export default SingleArticle;
