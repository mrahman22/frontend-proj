import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";

class Topics extends Component {
  state = {
    topics: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getTopics();
  }

  getTopics = () => {
    api.fetchTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  };

  render() {
    const { topics, isLoading } = this.state;
    if (isLoading) return "....Loading";
    return (
      <div className="topics-content">
        <ul>
          {topics.map((topic) => {
            return (
              <li className="topics" key={topic.slug}>
                <Link to={`/topics/${topic.slug}`}>
                  <h2 className="topics-header">{topic.slug}</h2>
                </Link>

                <br />
                <p className="topics-body">{topic.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Topics;
