import React, { Component } from "react";
import { ToolBar } from "../../components/Navigation/ToolBar";

export class Layout extends Component {
  // style = {
  //   height: "800px"
  // };
  render() {
    return (
      <div>
        {/* The persistent toolbar */}
        <ToolBar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        {/* This is the container of the content which is changing */}
        <main className="main" style={this.style}>
          {this.props.children}
        </main>
      </div>
    );
  }
}
