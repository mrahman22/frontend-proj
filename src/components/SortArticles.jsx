import React from "react";
// import * as api from "../utils/api";

class SortArticles extends React.Component {
  state = {
    sort_by: "",
    order: "",
  };

  handleInput = (key, value) => {
    this.setState({ [key]: value });
  };

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, order } = this.state;
    if (
      prevState.sort_by !== this.state.sort_by ||
      prevState.order !== this.state.order
    ) {
      this.props.fetchAllArticles(sort_by, order);
    }
  }

  render() {
    const { sort_by, order } = this.state;
    return (
      <>
        <label>
          sortArticlesBy:
          <select
            value={sort_by}
            name="sort_by"
            className="sort-articles"
            onChange={(e) => {
              this.handleInput("sort_by", e.target.value);
            }}
          >
            <option value="select" defaultValue>
              select
            </option>
            <option value="author">author</option>
            <option value="created_at" defaultValue>
              created_at
            </option>
            <option value="comment_count" defaultValue>
              comment_count
            </option>
            <option value="votes" defaultValue>
              votes
            </option>
          </select>
        </label>
        <label className="order">
          order:
          <select
            name="order"
            value={order}
            onChange={(e) => this.handleInput("order", e.target.value)}
          >
            <option value="select" defaultValue>
              select
            </option>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </label>
      </>
    );
  }
}

export default SortArticles;
