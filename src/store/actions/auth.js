import stya from "../../apis/stya";
import * as actionTypes from "./actionTypes";

const TWELVE_HOURS_MS = 12 * 3600 * 1000;

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  localStorage.setItem("userToken", token);
  return { type: actionTypes.AUTH_SUCCESS, userToken: token };
};

export const authFail = failedResData => {
  return {
    type: actionTypes.AUTH_FAIL,
    header: "Error",
    message: failedResData.status
  };
};

export const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("expireDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const registerSuccess = () => {
  return {
    type: actionTypes.REGIS_SUCCESS,
    header: "Success!",
    message: "You have registered successfully!"
  };
};

export const tryLoginAtStart = () => {
  return async dispatch => {
    var storedToken = localStorage.getItem("userToken");

    if (!storedToken) {
      dispatch(logout());
    } else {
      var expireDate = new Date(localStorage.getItem("expireDate"));
      var duration = expireDate.getTime() - new Date().getTime();

      //if less than 1 minute
      if (duration <= 1 * 60 * 1000) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(storedToken));
        dispatch(logoutOnTokenExpire(expireDate));
      }
    }
  };
};

//expiration time ini millisecond
export const logoutOnTokenExpire = expireDate => {
  localStorage.setItem("expireDate", expireDate);
  var duration = new Date(expireDate).getTime() - new Date().getTime();

  return dispatch => {
    const sendAction = dispatch => {
      return {
        type: actionTypes.LOGOUT_TIMEOUT,
        timer: setTimeout(() => {
          dispatch(logout());
        }, duration)
      };
    };
    dispatch(sendAction(dispatch));
  };
};

export const auth = (username, password, isLogin) => {
  return dispatch => {
    dispatch(authStart);

    const authData = { username: username, password: password };
    let url = "/login";

    if (!isLogin) {
      url = "/register";
    }

    stya
      .post(url, authData)

      .then(res => {
        const responseData = res.data;

        if (isLogin) {
          // if login success
          if (responseData.code === 0) {
            const expirationDate = new Date(
              new Date().getTime() + TWELVE_HOURS_MS
            );
            dispatch(authSuccess(responseData.token));
            dispatch(logoutOnTokenExpire(expirationDate));
          } else {
            dispatch(authFail(responseData));
          }
        } else {
          // register process
          if (responseData.code === 0) {
            dispatch(registerSuccess());
          } else {
            dispatch(authFail(responseData));
          }
        }
      })

      .catch(err => {});
  };
};
