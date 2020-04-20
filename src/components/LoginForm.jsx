import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    username: "",
    loggedOut: false,
  };

  handleInput = (key, value) => {
    this.setState({ [key]: value.toLowerCase(), loggedOut: false });
  };

  handleClick = (e) => {
    const { handleLogin } = this.props;
    e.preventDefault();
    handleLogin(this.state.username);
    this.setState({ username: "", loggedOut: false });
  };

  render() {
    const { loggedInUser, invalidUser, users } = this.props;
    return (
      <section className="login">
        <p>You must be logged in to post or delete a comment</p>
        {!loggedInUser && (
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleInput("username", e.target.value)}
          />
        )}

        {!loggedInUser ? (
          <>
            <p>Not currently logged in</p>
            <button className="login-btn" onClick={this.handleClick}>
              Log in
            </button>
          </>
        ) : (
          <p>You are logged in as: {loggedInUser}</p>
        )}
        {invalidUser && <p className="invalid-user">user not valid</p>}
        <p>Please see a list of valid users below</p>
        <ul>
          {users.map((user) => {
            return <li key={user.username}>{user.username}</li>;
          })}
        </ul>
        <br />
        {loggedInUser && (
          <button className="login-btn" onClick={this.props.handleLogout}>
            Log out
          </button>
        )}
      </section>
    );
  }
}

export default LoginForm;
