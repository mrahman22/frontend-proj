import React from "react";

const OrderBy = (props) => {
  return (
    <label className="order">
      order:
      <select onChange={(e) => props.handleOrder(e.target.value)}>
        <option value="select" defaultValue>
          select
        </option>
        <option value="asc">asc</option>
        <option value="desc">desc</option>
      </select>
    </label>
  );
};

export default OrderBy;
