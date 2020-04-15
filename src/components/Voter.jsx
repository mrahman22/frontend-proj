import React, { Component } from "react";
import * as api from "../utils/api";

class Voter extends Component {
  state = {
    optimisticVoting: 0,
  };

  handleClick = (updatevote) => {
    const { id, type } = this.props;
    this.setState((currentState) => {
      return { optimisticVoting: currentState.optimisticVoting + updatevote };
    });
    api.pathVotes(id, updatevote, type);
  };

  render() {
    const { optimisticVoting } = this.state;
    const { votes } = this.props;
    return (
      <section>
        <p>votes: {votes + optimisticVoting}</p>
        <button
          className="voter"
          disabled={optimisticVoting > 0}
          onClick={(e) => this.handleClick(1)}
        >
          Like
        </button>
        <button
          className="voter"
          disabled={optimisticVoting < 0}
          onClick={(e) => this.handleClick(-1)}
        >
          Dislike
        </button>
      </section>
    );
  }
}

export default Voter;
