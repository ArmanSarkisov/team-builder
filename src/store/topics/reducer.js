import { types } from './actions';

const initialState = {
    topics: [],
    errors: [],
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case types.GET_TOPICS_SUCCESS:
            return {
                ...state,
                topics: [...action.payload.topics],
                errors: [],
            };
        case types.GET_TOPICS_FAILURE:
            return {
                ...state,
                errors: ['some error']
            };
        case types.SET_TOPIC_VOTE_SUCCESS:
            return {
                ...state,
                topics: state.topics.map(topic => {
                    if (topic.id === action.payload.topic.id) {
                        return {
                            ...topic,
                            votedByMe: action.payload.topic.votedByMe,
                        }
                    }
                    return topic;
                }),
                errors: [],
            };
        case types.SET_NEW_TOPIC_SUCCESS:
            return {
                ...state,
                topics: [{...action.payload.topic}, ...state.topics],
                errors: [],
            };
        case types.DELETE_TOPIC_SUCCESS:
            return {
                ...state,
                topics: state.topics.filter(topic => topic.id !== action.payload.id),
                errors: [],
            };
        default:
            return state;
    }
}
