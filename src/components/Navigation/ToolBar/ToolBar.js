import React, { Component, Fragment } from "react";
import { NavigationItem } from "./NavigationItem";
import { Button } from "../../Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../store/actions";

class ToolBarComponent extends Component {
  handleLoginLogout = event => {
    const { isLoggedIn } = this.props;
    event.preventDefault();
    if (isLoggedIn) {
    } else {
    }
  };

  render() {
    let toBeRendered;
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      toBeRendered = (
        <Fragment>
          <NavigationItem to="/">Home</NavigationItem>
          <div className="right menu">
            <div className="item">
              <Button className="primary" onClick={this.props.logout}>
                Logout
              </Button>
            </div>
          </div>
        </Fragment>
      );
    } else {
      toBeRendered = (
        <Fragment>
          <div className="right menu">
            <div className="item">
              <Link to="/login">
                <Button className="primary">Login</Button>
              </Link>
            </div>
          </div>
        </Fragment>
      );
    }
    return (
      <div className="ui menu">
        <div className="header item">ITB NIM Finder</div>
        {toBeRendered}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isLoggedIn: state.auth.userToken != null };
};

const mapDispatchToProps = dispatch => {
  return { logout: () => dispatch(logout()) };
};
export const ToolBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBarComponent);
