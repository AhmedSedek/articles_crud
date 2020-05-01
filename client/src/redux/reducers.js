import {
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_REQUEST_FAILURE,
  DELETE_ARTICLE_REQUEST_SUCCESS,
  FETCH_ARTICLE_REQUEST,
  FETCH_ARTICLE_REQUEST_FAILURE,
  FETCH_ARTICLE_REQUEST_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILURE,
  LOGIN_REQUEST_SUCCESS,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_FAILURE,
  SIGNUP_REQUEST_SUCCESS,
  UPDATE_ARTICLE_REQUEST,
  UPDATE_ARTICLE_REQUEST_FAILURE,
  UPDATE_ARTICLE_REQUEST_SUCCESS,
} from "redux/actions";

export function login(
  state = { loginStatus: "", error: "" },
  action
) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        loginStatus: "IN_PROGRESS",
        error: "",
      };
    }
    case LOGIN_REQUEST_SUCCESS: {
      return {
        loginStatus: "SUCCEEDED",
        error: "",
      };
    }
    case LOGIN_REQUEST_FAILURE: {
      return {
        loginStatus: "FAILED",
        error: action.error,
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
    username: "",
    articleStatus: "",
    error: "",
    notFound: false,
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
        username: action.article.username,
        articleStatus: "SUCCEEDED",
        error: "",
        notFound: false,
      };
    }
    case FETCH_ARTICLE_REQUEST_FAILURE: {
      return {
        ...state,
        articleStatus: "FAILED",
        error: action.error,
        notFound: true,
      };
    }
    case UPDATE_ARTICLE_REQUEST: {
      return {
        ...state,
        articleStatus: "UPDATING",
      };
    }
    case UPDATE_ARTICLE_REQUEST_SUCCESS: {
      return {
        title: action.article.title,
        timeCreated: action.article.timeCreated,
        timeUpdated: action.article.timeUpdated,
        id: action.article.id,
        username: action.article.username,
        content: action.article.content,
        userId: action.article.userId,
        articleStatus: "SUCCEEDED",
        error: "",
      };
    }
    case UPDATE_ARTICLE_REQUEST_FAILURE: {
      return {
        ...state,
        articleStatus: "FAILED",
        error: action.error,
      };
    }
    case DELETE_ARTICLE_REQUEST: {
      return {
        ...state,
        articleStatus: "DELETING",
        error: "",
        notFound: false,
      };
    }
    case DELETE_ARTICLE_REQUEST_SUCCESS: {
      return {
        title: "",
        timeCreated: null,
        timeUpdated: null,
        id: "",
        content: "",
        userId: "",
        username: "",
        articleStatus: "",
        error: "",
        notFound: true,
      };
    }
    case DELETE_ARTICLE_REQUEST_FAILURE: {
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
