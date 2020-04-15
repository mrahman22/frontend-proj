import React from "react";
import { Link } from "@reach/router";

const Nav = () => {
  return (
    <nav>
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/articles"}>
          <li>Articles</li>
        </Link>
        <Link to={"/login"}>
          <li>Login</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
