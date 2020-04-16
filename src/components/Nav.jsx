import React from "react";
import { Link } from "@reach/router";

const Nav = (props) => {
  return (
    <nav className="sidebar">
      <ul>
        <Link to="/">
          <li className="btn">Home</li>
        </Link>
        <Link to="/articles">
          <li className="btn">Articles</li>
        </Link>
        {props.loggedInUser !== null ? (
          <Link to="/login">
            <li className="btn-unique">{props.loggedInUser}</li>
          </Link>
        ) : (
          <Link to="/login">
            <li className="btn">Login</li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
