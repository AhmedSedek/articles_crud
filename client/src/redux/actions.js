import { ArticlesClient, UsersClient } from "Client";
import LocalStorage from "LocalStorage";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
function loginRequest() {
  return { type: LOGIN_REQUEST };
}

export const LOGIN_REQUEST_FAILURE = "LOGIN_REQUEST_FAILURE";
function loginFailure(error) {
  return { type: LOGIN_REQUEST_FAILURE, error: error.toString() };
}

export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
function loginSuccess() {
  return { type: LOGIN_REQUEST_SUCCESS };
}

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
function logoutRequest() {
  return { type: LOGOUT_REQUEST };
}

export const SIGNUP_CLEAR = "SIGNUP_CLEAR";
function signupClear() {
  return { type: SIGNUP_CLEAR };
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

export const FETCH_ARTICLE_REQUEST = "FETCH_ARTICLE_REQUEST";
function fetchArticleRequest() {
  return { type: FETCH_ARTICLE_REQUEST };
}
export const FETCH_ARTICLE_REQUEST_FAILURE = "FETCH_ARTICLE_REQUEST_FAILURE";
function fetchArticleFailure(error) {
  return { type: FETCH_ARTICLE_REQUEST_FAILURE, error };
}
export const FETCH_ARTICLE_REQUEST_SUCCESS = "FETCH_ARTICLE_REQUEST_SUCCESS";
function fetchArticleSuccess(article) {
  return { type: FETCH_ARTICLE_REQUEST_SUCCESS, article };
}

export const UPDATE_ARTICLE_REQUEST = "UPDATE_ARTICLE_REQUEST";
function updateArticleRequest() {
  return { type: UPDATE_ARTICLE_REQUEST };
}
export const UPDATE_ARTICLE_REQUEST_FAILURE = "UPDATE_ARTICLE_REQUEST_FAILURE";
function updateArticleFailure(error) {
  return { type: UPDATE_ARTICLE_REQUEST_FAILURE, error };
}
export const UPDATE_ARTICLE_REQUEST_SUCCESS = "UPDATE_ARTICLE_REQUEST_SUCCESS";
function updateArticleSuccess(article) {
  return { type: UPDATE_ARTICLE_REQUEST_SUCCESS, article };
}

export const DELETE_ARTICLE_REQUEST = "DELETE_ARTICLE_REQUEST";
function deleteArticleRequest() {
  return { type: DELETE_ARTICLE_REQUEST };
}
export const DELETE_ARTICLE_REQUEST_FAILURE = "DELETE_ARTICLE_REQUEST_FAILURE";
function deleteArticleFailure(error) {
  return { type: DELETE_ARTICLE_REQUEST_FAILURE, error };
}
export const DELETE_ARTICLE_REQUEST_SUCCESS = "DELETE_ARTICLE_REQUEST_SUCCESS";
function deleteArticleSuccess() {
  return { type: DELETE_ARTICLE_REQUEST_SUCCESS };
}

export function attemptLogin(user) {
  return function (dispatch) {
    dispatch(loginRequest());
    const client = new UsersClient();
    client
      .verifyUser(user)
      .then((res) => {
        LocalStorage.getInstance().setLoggedInUser(res);
        dispatch(loginSuccess());
      })
      .catch((err) => dispatch(loginFailure(err)));
  };
}

export function attempLogout() {
  return function (dispatch) {
    dispatch(logoutRequest());
    LocalStorage.getInstance().unsetLoggedInUser();
  };
}

export function attemptSignup(user) {
  return function (dispatch) {
    dispatch(signupRequest());
    const client = new UsersClient();
    client
      .createUser(user)
      .then((res) => dispatch(signupSuccess(res)))
      .then(() => dispatch(signupClear()))
      .catch((err) => dispatch(signupFailure(err)));
  };
}

export function fetchArticle(articleId) {
  return function (dispatch) {
    dispatch(fetchArticleRequest(articleId));
    const client = new ArticlesClient();
    client
      .getArticle({ articleId })
      .then((res) => dispatch(fetchArticleSuccess(res)))
      .catch((err) => dispatch(fetchArticleFailure(err)));
  };
}

export function updateArticle(article) {
  return function (dispatch) {
    dispatch(updateArticleRequest());
    const client = new ArticlesClient();
    client
      .updateArticle(article)
      .then((res) => dispatch(updateArticleSuccess(article)))
      .catch((err) => dispatch(updateArticleFailure(err)));
  };
}

export function deleteArticle(articleId) {
  return function (dispatch) {
    dispatch(deleteArticleRequest());
    const client = new ArticlesClient();
    client
      .deleteArticle({ id: articleId })
      .then((res) => dispatch(deleteArticleSuccess()))
      .catch((err) => dispatch(deleteArticleFailure(err)));
  };
}
