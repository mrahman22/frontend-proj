import React from "react";

const SortArticles = (props) => {
  return (
    <select
      className="sort-articles"
      onChange={(e) => {
        props.handleSort(e.target.value);
      }}
    >
      sortBy:
      <option value="select" defaultValue>
        select
      </option>
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
  );
};

export default SortArticles;
