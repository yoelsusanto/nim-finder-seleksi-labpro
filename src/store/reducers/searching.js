import * as actionTypes from "../actions/actionTypes";

const initialState = {
  results: [],
  message: null,
  hasMore: false,
  page: 0,
  isLoading: false,
  keyword: ""
};

const searchFound = (state, action) => {
  var results, page;
  if (action.isOnDemand) {
    results = [...state.results, ...action.results];
    page = state.page + 1;
  } else {
    results = action.results;
    page = 0;
  }
  return {
    ...state,
    results: results,
    message: null,
    isLoading: false,
    page: page,
    hasMore: action.hasMore
  };
};

const sendSearchMessage = (state, action) => {
  return { ...state, message: action.message, results: [], isLoading: false };
};

const searchStart = (state, action) => {
  return {
    ...state,
    message: action.message,
    isLoading: true,
    keyword: action.keyword
  };
};

const searchingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_START:
      return searchStart(state, action);
    case actionTypes.SEARCH_FOUND:
      return searchFound(state, action);
    case actionTypes.SEARCH_NOT_FOUND:
      return sendSearchMessage(state, action);
    case actionTypes.NOT_SEARCHING:
      return sendSearchMessage(state, action);
    case actionTypes.AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default searchingReducer;
