import React from "react";
import moment from "moment";
import Voter from "./Voter";

const Comments = (props) => {
  const { loggedInUser, comments } = props;
  return (
    <div className="all-comments">
      <h3 className="comment-title">username: {comments.author}</h3>
      <p>
        The following comment was left by {comments.author} on <span></span>
        {moment(comments.created_at).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
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
