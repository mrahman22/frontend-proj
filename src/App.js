import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Home from "./components/Home";
import { Router } from "@reach/router";
//import AllArticles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";
import GetArticlesByTopic from "./components/GetArticlesByTopic";
import LoginForm from "./components/LoginForm";
// import Comments from "./components/Comments";
import ArticlesList from "./components/ArticlesList";

class App extends React.Component {
  state = {
    users: [
      "jessjelly",
      "tickle122",
      "weegembump",
      "cooljmessy",
      "grumpy19",
      "happyamy2016",
    ],
    loggedInUser: "",
  };

  handleLogin = (user) => {
    const { users } = this.state;
    if (users.includes(user)) {
      this.setState({ loggedInUser: user });
    } else {
      alert("user not valid");
    }
  };

  handleLogout = () => {
    this.setState({ loggedInUser: "" });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Router>
          <Home path="/" />
          {/* <AllArticles path="/articles" /> */}
          <ArticlesList path="/articles" />
          <SingleArticle
            path="/articles/:article_id"
            loggedInUser={this.state.loggedInUser}
          />
          <GetArticlesByTopic path="/topics/:topic_slug" />
          {/* <Comments
            path="/articles/:article_id/comments"
            loggedInUser={this.state.loggedInUser}
          /> */}
          <LoginForm
            path="/login"
            handleLogin={this.handleLogin}
            loggedInUser={this.state.loggedInUser}
            handleLogout={this.handleLogout}
          />
        </Router>
      </div>
    );
  }
}

export default App;
