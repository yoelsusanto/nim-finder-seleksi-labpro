import React from "react";
import { connect } from "react-redux";
import { search } from "../../store/actions/";

class SearchBarComponent extends React.Component {
  state = { currentKeyword: "", timer: null };

  componentDidMount = () => {
    this.props.search("", this.props.userToken);
  };

  onKeywordChange = event => {
    // event.persist();
    clearTimeout(this.state.timer);

    this.setState({ currentKeyword: event.target.value });

    const timer = setTimeout(() => {
      this.props.search(
        this.state.currentKeyword,
        this.props.userToken,
        false,
        0
      );
    }, 500);

    this.setState({ timer: timer });
  };

  render() {
    return (
      <div className="ui fluid icon input">
        <input
          type="text"
          value={this.state.currentKeyword}
          onChange={this.onKeywordChange}
          placeholder="Masukkan NIM atau Nama"
        />
        <i className="search icon" />
      </div>
    );
  }

  style = {
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: "600"
    // color: "white"
  };
}

const mapDispatchToState = dispatch => {
  return {
    search: (keyword, userToken, isOnDemand, page) =>
      dispatch(search(keyword, userToken, isOnDemand, page))
  };
};

const mapStateToProps = state => {
  return {
    userToken: state.auth.userToken
  };
};

export const SearchBar = connect(
  mapStateToProps,
  mapDispatchToState
)(SearchBarComponent);
