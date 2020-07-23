import { types } from './actions';

const initialState = {
    teams: [],
    errors: [],
};


export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.GET_TEAMS_SUCCESS:
            return {
                ...state,
                teams: [...action.payload.teams, ...state.teams],
                errors: [],
            };
        case types.GET_TEAMS_FAILURE:
            return {
                ...state,
                errors: [action.payload.message]
            };
        default:
            return state;
    }
}
