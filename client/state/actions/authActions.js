export const FETCH_AUTH_REQUEST = "FETCH_AUTH_REQUEST";
export const FETCH_AUTH_SUCCESS = "FETCH_AUTH_SUCCESS";
export const FETCH_AUTH_FAILURE = "FETCH_AUTH_FAILURE";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const fetchAuthRequest = () => ({
  type: FETCH_AUTH_REQUEST,
});

export const fetchAuthSuccess = (user, token) => ({
  type: FETCH_AUTH_SUCCESS,
  payload: { user, token },
});

export const fetchAuthFailure = (error) => ({
  type: FETCH_AUTH_FAILURE,
  payload: error,
});
export const authLogout = () => ({
  type: AUTH_LOGOUT,
});
