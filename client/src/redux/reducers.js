import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
} from "./actions";

function login(
  state = { loginStatus: "", loggedInUser: {}, error: "" },
  action
) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        loginStatus: "IN_PROGRESS",
        loggedInUser: {},
        error: "",
      };
    }
    case LOGIN_REQUEST_SUCCESS: {
      return {
        loginStatus: "SUCCEEDED",
        loggedInUser: action.user,
        error: "",
      };
    }
    case LOGIN_REQUEST_FAILURE: {
      return {
        loginStatus: "FAILED",
        loggedInUser: {},
        error: action.error,
      };
    }
    default:
      return state;
  }
}

export default login;
