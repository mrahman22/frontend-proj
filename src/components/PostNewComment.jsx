import React, { Component } from "react";

class PostNewComment extends Component {
  state = {
    body: "",
  };

  handleInput = (key, value) => {
    this.setState({ [key]: value });
  };

  handleSubmit = (e) => {
    const { postComment } = this.props;
    e.preventDefault();
    postComment(this.state);
    this.setState({ body: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          body:
          <input
            type="text"
            name="body"
            required
            value={this.state.body}
            onChange={(e) => this.handleInput("body", e.target.value)}
          />
        </label>
        <button>Post Comment</button>
      </form>
    );
  }
}

export default PostNewComment;
