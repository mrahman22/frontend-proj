import React from "react";
import "./App.css";
import Header from "./components/Header";
import * as api from "./utils/api";
import Home from "./components/Home";
import { Router } from "@reach/router";
import SingleArticle from "./components/SingleArticle";
import LoginForm from "./components/LoginForm";
import ErrorForm from "./components/ErrorForm";
import ArticlesList from "./components/ArticlesList";

class App extends React.Component {
  state = {
    users: [],
    loggedInUser: null,
    invalidUser: null,
  };

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    api.fetchAllUsers().then((users) => {
      this.setState({ users });
    });
  };

  handleLogin = (user) => {
    const users = this.state.users.map((user) => user.username);
    if (users.includes(user)) {
      this.setState({ loggedInUser: user, invalidUser: null });
    } else {
      this.setState({ invalidUser: user, loggedInUser: null });
    }
  };

  handleLogout = () => {
    this.setState({ loggedInUser: null });
  };

  render() {
    return (
      <div className="App">
        <Header loggedInUser={this.state.loggedInUser} />
        <Router>
          <Home path="/" />
          <ArticlesList path="/articles" />
          <ArticlesList path="/topics/:topic_slug" />
          <SingleArticle
            path="/articles/:article_id"
            loggedInUser={this.state.loggedInUser}
          />
          <LoginForm
            path="/login"
            handleLogin={this.handleLogin}
            loggedInUser={this.state.loggedInUser}
            handleLogout={this.handleLogout}
            invalidUser={this.state.invalidUser}
            users={this.state.users}
          />
          <ErrorForm default status={404} msg={"page not found"} />
        </Router>
      </div>
    );
  }
}

export default App;
