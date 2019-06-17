import React, { Component } from "react";
import { Result } from "./Result";
import { Message } from "../../../../components/Message";
import { connect } from "react-redux";
import { search } from "../../../../store/actions";

import _ from "lodash";

class ResultsComponent extends Component {
  handleScroll = _.throttle(e => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    // if sisa height < 100
    const reachBottom = scrollHeight - (scrollTop + clientHeight) < 100;
    const { userToken, keyword, page, isLoading, hasMore } = this.props;
    if (reachBottom && hasMore && !isLoading) {
      this.props.onDemand(userToken, keyword, page);
    }
  }, 500);

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll, true);
  };

  render() {
    let content, message;

    const renderedItem = items => {
      return items.map(item => {
        return <Result key={item.nim_jur} item={item} />;
      });
    };
    if (this.props.results) {
      content = (
        <div className="ui very relaxed selection animated divided list">
          {renderedItem(this.props.results)}
        </div>
      );
    }

    if (this.props.message) {
      message = (
        <div>
          <Message
            className={this.props.message.type}
            header={this.props.message.header}
            message={this.props.message.message}
          />
        </div>
      );
    }

    return (
      <div style={{ marginTop: "20px", marginBottom: "30px" }}>
        {content}
        {message}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userToken: state.auth.userToken,
    results: state.search.results,
    message: state.search.message,
    page: state.search.page,
    isLoading: state.search.isLoading,
    keyword: state.search.keyword,
    hasMore: state.search.hasMore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDemand: (userToken, keyword, page) =>
      dispatch(search(keyword, userToken, true, page + 1))
  };
};

export const Results = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsComponent);
