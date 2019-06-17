import React, { Component } from "react";
import { SearchBar } from "../../../components/SearchBar";
import { Results } from "./Results";
import { connect } from "react-redux";
import stya from "../../../apis/stya";

class NIMFinderComponent extends Component {
  state = {
    currentKeyword: "",
    results: [],
    message: null
  };

  onKeywordChange = async keyword => {
    if (keyword.length > 0) {
      this.setState({ currentKeyword: keyword });

      var payload = await stya.get("/byname", {
        headers: {
          "Auth-Token": this.props.userToken
        },
        params: {
          name: this.state.currentKeyword,
          count: 50,
          page: 0
        }
      });
      payload = payload.data.payload;

      if (payload.length > 0) {
        this.setState({ results: payload, message: null });
      } else {
        this.setState({
          message: {
            type: "negative",
            header: "Not Found!",
            message: "Sorry, we can't find any result :("
          }
        });
      }
    } else {
      this.setState({
        message: {
          type: "blue",
          header: "Searching?",
          message: "Please type in your keyword"
        }
      });
    }
  };

  componentDidMount = () => {
    this.onKeywordChange("");
  };
  render() {
    return (
      <div>
        <SearchBar onChange={this.onKeywordChange} />
        <Results results={this.state.results} message={this.state.message} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userToken: state.auth.userToken
  };
};

export const NIMFinder = connect(mapStateToProps)(NIMFinderComponent);
