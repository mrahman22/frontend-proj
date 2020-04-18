import React from "react";

const SortArticles = (props) => {
  return (
    <label>
      sortArticlesBy:
      <select
        className="sort-articles"
        onChange={(e) => {
          props.fetchAllArticles(e.target.value);
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
  );
};

export default SortArticles;
