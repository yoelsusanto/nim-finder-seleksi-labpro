import stya from "../../apis/stya";
import * as actionTypes from "./actionTypes";
import { logoutOnTokenExpire } from "./auth";

const TWELVE_HOURS_MS = 12 * 3600 * 1000;

const searchStart = keyword => {
  return {
    type: actionTypes.SEARCH_START,
    message: {
      type: "yellow",
      header: "Loading...",
      message: "Trying to load data, please wait"
    },
    keyword: keyword
  };
};

export const search = (
  keyword,
  userToken,
  isOnDemand,
  page
) => async dispatch => {
  if (keyword.length > 0) {
    dispatch(searchStart(keyword));
    const res = await stya.get("/byname", {
      headers: {
        "Auth-Token": userToken
      },
      params: {
        name: keyword,
        count: 30,
        page: page
      }
    });

    const payload = await res.data.payload;

    if (payload.length > 0) {
      dispatch(searchFound(payload, isOnDemand, true));
    } else {
      // jika tidak ada hasil
      if (isOnDemand) {
        dispatch(searchFound([], isOnDemand, false));
      } else {
        dispatch(searchNotFound());
      }
    }
    var expireDate = new Date(new Date().getTime() + TWELVE_HOURS_MS);

    dispatch(logoutOnTokenExpire(expireDate));
  } else {
    dispatch(notSearching());
  }
};

const searchNotFound = () => {
  return {
    type: actionTypes.SEARCH_NOT_FOUND,
    message: {
      type: "negative",
      header: "Not Found!",
      message: "Sorry, we can't find any result :("
    }
  };
};

const searchFound = (results, isOnDemand, hasMore) => {
  return {
    type: actionTypes.SEARCH_FOUND,
    results: results,
    isOnDemand: isOnDemand,
    hasMore: hasMore
  };
};

const notSearching = () => {
  return {
    type: actionTypes.NOT_SEARCHING,
    message: {
      type: "blue",
      header: "Searching?",
      message: "Please type in your keyword"
    }
  };
};
