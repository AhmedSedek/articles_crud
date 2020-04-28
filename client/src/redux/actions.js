import Client from "../Client";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
function loginRequest(user) {
  return { type: LOGIN_REQUEST, user };
}

export const LOGIN_REQUEST_FAILURE = "LOGIN_REQUEST_FAILURE";
function loginFailure(error) {
  return { type: LOGIN_REQUEST_FAILURE, error: error.toString() };
}

export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
function loginSuccess(user) {
  return { type: LOGIN_REQUEST_SUCCESS, user };
}

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export function logoutRequest() {
  return { type: LOGOUT_REQUEST };
}

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
function signupRequest(user) {
  return { type: SIGNUP_REQUEST, user };
}

export const SIGNUP_REQUEST_FAILURE = "SIGNUP_REQUEST_FAILURE";
function signupFailure(error) {
  return { type: SIGNUP_REQUEST_FAILURE, error: error.status };
}

export const SIGNUP_REQUEST_SUCCESS = "SIGNUP_REQUEST_SUCCESS";
function signupSuccess(user) {
  return { type: SIGNUP_REQUEST_SUCCESS, user };
}

export function attemptLogin(user) {
  return function (dispatch) {
    dispatch(loginRequest);
    const client = new Client();
    client
      .verifyUser(user)
      .then((res) => dispatch(loginSuccess(res)))
      .catch((err) => dispatch(loginFailure(err)));
  };
}

export function attemptSignup(user) {
  return function (dispatch) {
    dispatch(signupRequest);
    const client = new Client();
    client
      .createUser(user)
      .then((res) => dispatch(signupSuccess(res)))
      .catch((err) => dispatch(signupFailure(err)));
  };
}
