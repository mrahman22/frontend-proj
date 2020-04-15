import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";
import PostNewComment from "./PostNewComment";
import Voter from "./Voter";

class SingleArticle extends Component {
  state = {
    selectedArticle: [],
    comments: [],
    isLoading: true,
    type: "articles",
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
    api.fetchArticleById(article_id).then((selectedArticle) => {
      this.setState({ selectedArticle, isLoading: false });
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
    const { selectedArticle, isLoading, comments } = this.state;
    if (isLoading) return "....Loading";
    return (
      <div className="all-comments">
        <section className="single-article">
          <h2>{selectedArticle.title}</h2>
          <p>Author: {selectedArticle.author}</p>
          <p>Topic: {selectedArticle.topic}</p>
          <p>Created_at: {selectedArticle.created_at}</p>
          <p>Body: {selectedArticle.body}</p>
          <p>Comment Count: {selectedArticle.comment_count}</p>
          {/* <p>Votes: {selectedArticle.votes}</p> */}
          <Voter
            votes={selectedArticle.votes}
            id={selectedArticle.article_id}
            type={this.state.type}
          />
        </section>
        <Link to={"/login"}>
          <p className="login-msg">
            You must be logged in to post or delete a comment
          </p>
        </Link>
        {loggedInUser && <PostNewComment postComment={this.postComment} />}
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <br />
                <h3>username: {comment.author}</h3>
                <p>comment_id: {comment.comment_id}</p>
                <p>article_id: {comment.article_id}</p>
                <p>created_at: {comment.created_at}</p>
                <p>body: {comment.body}</p>
                {/* <p>votes: {comment.votes}</p> */}
                <Voter votes={comment.votes} id={comment.comment_id} />
                {loggedInUser === comment.author && (
                  <button
                    className="del-btn"
                    onClick={(e) => {
                      this.deleteComment(comment.comment_id);
                    }}
                  >
                    Delete comment
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SingleArticle;
