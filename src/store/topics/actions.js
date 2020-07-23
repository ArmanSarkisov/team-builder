import axiosInstance from '../../api';

export const types =  {
    GET_TOPICS_SUCCESS: 'GET_TOPICS_SUCCESS',
    GET_TOPICS_FAILURE: 'GET_TOPICS_FAILURE',
    SET_TOPIC_VOTE_SUCCESS: 'SET_TOPIC_VOTE_SUCCESS',
    SET_NEW_TOPIC_SUCCESS: 'SET_NEW_TOPIC_SUCCESS',
    DELETE_TOPIC_SUCCESS: 'DELETE_TOPIC_SUCCESS',
};


export const getTopics = () => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get('/topics');
            dispatch(setTopicsSuccess(response.data))
        } catch (e) {
            console.log(e.message);
        }
    }
};

export const setVoteTopic = (id, data) => {
    return async dispatch => {
        try {
            const response = await axiosInstance.post(`/topics/${ id }/voting`, data);
            dispatch(setVoteTopicSuccess(response.data));
        } catch (e) {
            console.log(e.message);
        }
    }
};

export const setNewTopic = (data) => {
    return async dispatch => {
        try {
            const response = await axiosInstance.post(`/topics`, data);
            dispatch(setNewTopicSuccess(response.data));
        } catch (e) {
            console.log(e.message);
        }
    }
};

export const deleteTopic = id => {
    return async dispatch => {
        try {
            const response = await axiosInstance.delete(`/topics/${ id }`);
            dispatch(deleteTopicSuccess(response.data, id));
        } catch (e) {
            console.log(e.message);
        }
    }
};

export const setTopicsSuccess = topics => {
    return {
        type: types.GET_TOPICS_SUCCESS,
        payload: {
            topics,
        }
    }
};

export const setVoteTopicSuccess = topic => {
    return {
        type: types.SET_TOPIC_VOTE_SUCCESS,
        payload: {
            topic,
        }
    }
};

export const setNewTopicSuccess = topic => {
    return {
        type: types.SET_NEW_TOPIC_SUCCESS,
        payload: {
            topic,
        }
    }
};

export const deleteTopicSuccess = (topic, id) => {
    return {
        type: types.DELETE_TOPIC_SUCCESS,
        payload: {
            topic,
            id
        }
    }
};


