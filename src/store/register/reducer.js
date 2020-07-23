import { types } from './actions';

const initialState = {
    registeredUser: {},
    companies: [],
    errors: [],
};


export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.USER_REGISTER_SUCCESS:
            return {
                ...state,
                registeredUser: {...action.payload},
                errors: [],
            };
        case types.GET_COMPANIES_SUCCESS:
            return {
                ...state,
                companies: [...state.companies, ...action.payload.companies]
            };
        case types.GET_COMPANIES_FAILURE:
            return {
                ...state,
                errors: [action.payload.message]
            };
        default:
            return state;
    }
}
