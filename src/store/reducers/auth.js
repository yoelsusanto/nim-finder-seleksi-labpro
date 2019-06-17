import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userToken: null,
  authMessage: null,
  authLoading: false,
  logoutTimer: null
};

const authStart = state => {
  return { ...state, authMessage: null, authLoading: true };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    userToken: action.userToken,
    authLoading: false,
    authMessage: {
      type: "positive",
      header: "Login success!",
      message: "You have been logged in successfully!"
    }
  };
};

const regisSucces = (state, action) => {
  return {
    ...state,
    authMessage: {
      type: "positive",
      header: action.header,
      message: action.message
    }
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    authMessage: {
      type: "negative",
      header: action.header,
      message: action.message
    },
    authLoading: false
  };
};

const authLogout = state => {
  return initialState;
};

const logoutTimeout = (state, action) => {
  clearTimeout(state.logoutTimer);
  return { ...state, logoutTimer: action.timer };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.REGIS_SUCCESS:
      return regisSucces(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.LOGOUT_TIMEOUT:
      return logoutTimeout(state, action);
    default:
      return state;
  }
};

export default authReducer;
