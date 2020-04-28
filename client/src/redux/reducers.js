import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILURE,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_REQUEST,
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
    case LOGOUT_REQUEST: {
      return {
        loginStatus: "",
        loggedInUser: {},
        error: "",
      };
    }
    default:
      return state;
  }
}
export default login;
