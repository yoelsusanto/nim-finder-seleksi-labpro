import React from "react";

export const Message = props => {
  return (
    <div className={`ui message ${props.className}`}>
      <i className="close icon"></i>
      <div className="header">{props.header}</div>
      <p>{props.message}</p>
    </div>
  );
};
