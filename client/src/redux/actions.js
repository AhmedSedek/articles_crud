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
