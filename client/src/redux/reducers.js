import {
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_REQUEST_FAILURE,
  FETCH_ARTICLE_REQUEST_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILURE,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_REQUEST,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_FAILURE,
  SIGNUP_REQUEST_SUCCESS,
} from "./actions";

export function login(
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

export function signup(state = { signupStatus: "", error: "" }, action) {
  switch (action.type) {
    case SIGNUP_REQUEST: {
      return {
        signupStatus: "IN_PROGRESS",
        error: "",
      };
    }
    case SIGNUP_REQUEST_SUCCESS: {
      return {
        signupStatus: "SUCCEEDED",
        error: "",
      };
    }
    case SIGNUP_REQUEST_FAILURE: {
      return {
        signupStatus: "FAILED",
        error: action.error,
      };
    }
    default:
      return state;
  }
}

export function article(
  state = {
    title: "",
    timeCreated: null,
    timeUpdated: null,
    id: "",
    content: "",
    userId: "",
    articleStatus: "",
    error: "",
  },
  action
) {
  switch (action.type) {
    case FETCH_ARTICLE_REQUEST: {
      return {
        ...state,
        articleStatus: "FETCHING",
      };
    }
    case FETCH_ARTICLE_REQUEST_SUCCESS: {
      return {
        title: action.article.title,
        timeCreated: action.article.timeCreated,
        timeUpdated: action.article.timeUpdated,
        id: action.article.id,
        content: action.article.content,
        userId: action.article.userId,
        articleStatus: "SUCCEEDED",
        error: "",
      };
    }
    case FETCH_ARTICLE_REQUEST_FAILURE: {
      return {
        ...state,
        articleStatus: "FAILED",
        error: action.error,
      };
    }
    default:
      return state;
  }
}
