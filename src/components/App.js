import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "../scenes/Layout";
import { Login } from "../scenes/Layout/Login";
import { NIMFinder } from "../scenes/Layout/NIMFinder";
import { connect } from "react-redux";

import { tryLoginAtStart, logoutOnTokenExpire } from "../store/actions";

class App extends Component {
  componentDidMount() {
    this.props.tryLoginAtStart();
  }

  render() {
    return (
      <div className="ui container" style={this.style}>
        <Layout>
          <Switch>
            <Route path="/login" component={Login} />
            {!this.props.isLoggedIn ? <Redirect to="/login" /> : null}
            {this.props.isLoggedIn ? (
              <Route path="/" component={NIMFinder} />
            ) : null}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.userToken != null,
    logoutTimer: state.auth.logoutTimer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryLoginAtStart: () => dispatch(tryLoginAtStart()),
    logoutOnTokenExpire: duration => dispatch(logoutOnTokenExpire(duration))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
