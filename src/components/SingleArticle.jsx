import React, { Component } from "react";
import * as api from "../utils/api";
import moment from "moment";
import PostNewComment from "./PostNewComment";
import Comments from "./Comments";
import Voter from "./Voter";
import Loader from "./Loader";

class SingleArticle extends Component {
  state = {
    selectedArticle: [],
    comments: [],
    isLoading: true,
    type: "articles",
    hasError: false,
  };

  componentDidMount() {
    this.getArticleById();
    this.fetchCommentsByArticles();
  }

  fetchCommentsByArticles = () => {
    const { article_id } = this.props;
    api.fetchCommentsById(article_id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  };

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

  postComment = (newComments) => {
    const { loggedInUser, article_id } = this.props;
    newComments.username = loggedInUser;
    api.postNewComment(article_id, newComments).then((comment) => {
      this.setState((currentState) => {
        return { comments: [comment, ...currentState.comments] };
      });
    });
  };

  deleteComment = (comment_id) => {
    api.deleteCommentById(comment_id);
    this.setState((currentState) => {
      return {
        comments: currentState.comments.filter((comment) => {
          return comment.comment_id !== comment_id;
        }),
      };
    });
  };

  render() {
    const { loggedInUser } = this.props;
    const { selectedArticle, isLoading, comments, hasError } = this.state;
    if (hasError)
      return <p className="article-error">"article id does not exist"</p>;
    if (isLoading) return <Loader />;
    return (
      <div className="all-comments">
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
        <p>You must be logged in to post or delete a comment</p>
        {loggedInUser && <PostNewComment postComment={this.postComment} />}
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <Comments
                  comments={comment}
                  loggedInUser={this.props.loggedInUser}
                  deleteComment={this.deleteComment}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SingleArticle;
