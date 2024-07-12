import {
  AUTH_LOGOUT,
  FETCH_AUTH_FAILURE,
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
} from "../actions/authActions";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
      };
    case FETCH_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
