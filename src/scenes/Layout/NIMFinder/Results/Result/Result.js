import React from "react";

export const Result = ({ item }) => {
  return (
    <div className="item">
      <img
        className="ui avatar image"
        src={`https://ui-avatars.com/api/?name=${item.name}&rounded=true`}
        alt="user profile"
      />
      <div className="content">
        <div className="header">{item.name}</div>
        <div className="ui horizontal divided list">
          <div className="item">
            <div className="description">{item.prodi}</div>
          </div>
          <div className="item">
            <div className="description">{item.nim_jur}</div>
          </div>
          <div className="item">
            <div className="description">{item.nim_tpb}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
