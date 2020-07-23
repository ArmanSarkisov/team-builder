import { types } from './actions';

const initialState = {
    projects: [],
    errors: [],
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.GET_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: [...action.payload.projects],
                errors: [],
            };
        case types.PROJECTS_FAILURE:
            return {
                ...state,
                errors: ['some error']
            };
        case types.SET_PROJECT_VOTE_SUCCESS:
            return {
                ...state,
                projects: state.projects.map(projects => {
                    if (projects.id === action.payload.project.id) {
                        return {
                            ...projects,
                            votedByMe: action.payload.project.votedByMe,
                        }
                    }
                    return projects;
                }),
                errors: [],
            };
        default:
            return state;
    }
}
