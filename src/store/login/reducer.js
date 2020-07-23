import { types } from './actions';

const initialState = {
  user: {},
  isLoggedIn: false,
};


export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.USER_IS_LOG_IN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: true,
            };
        case types.USER_IS_LOG_OUT_SUCCESS:
            return {
                ...state,
                user: {},
                isLoggedIn: false,
            };
        case types.GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: true,
            };
        default:
            return state;
    }
}
