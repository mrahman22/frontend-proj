import React from "react";
import Voter from "./Voter";

const Comments = (props) => {
  const { loggedInUser, comments } = props;
  return (
    <div className="all-comments">
      <h3 className="comment-title">username: {comments.author}</h3>
      <p>created at: {comments.created_at}</p>
      <p>body: {comments.body}</p>
      <Voter votes={comments.votes} id={comments.comment_id} />
      {loggedInUser === comments.author && (
        <button
          className="del-btn"
          onClick={(e) => {
            props.deleteComment(comments.comment_id);
          }}
        >
          Delete comment
        </button>
      )}
    </div>
  );
};

export default Comments;
