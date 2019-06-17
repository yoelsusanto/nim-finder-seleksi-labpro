import React from "react";
import { Link } from "react-router-dom";

export const NavigationItem = props => {
  return (
    <Link className="item" to={props.to}>
      {props.children}
    </Link>
  );
};
