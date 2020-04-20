import React from "react";
import moment from "moment";
import * as api from "../utils/api";
import PostNewComment from "./PostNewComment";
import Voter from "./Voter";
import Loader from "./Loader";

class Comments extends React.Component {
  state = {
    comments: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchCommentsByArticles();
  }

  fetchCommentsByArticles = () => {
    const { article_id } = this.props;
    api.fetchCommentsById(article_id).then((comments) => {
      this.setState({ comments, isLoading: false });
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
    const { comments, isLoading } = this.state;
    const { loggedInUser } = this.props;
    if (isLoading) return <Loader />;
    return (
      <div className="all-comments">
        <p className="must-login-msg">
          You must be logged in to post or delete a comment
        </p>
        {loggedInUser && <PostNewComment postComment={this.postComment} />}
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <h3>username: {comment.author}</h3>
              <p>
                The following comment was left by {comment.author} on{" "}
                <span></span>
                {moment(comment.created_at).format("MMMM Do YYYY, h:mm:ss a")}
              </p>
              <p>body: {comment.body}</p>
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
      </div>
    );
  }
}

export default Comments;
