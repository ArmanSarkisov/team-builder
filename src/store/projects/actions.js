import axiosInstance from '../../api';

export const types =  {
    GET_PROJECTS_SUCCESS: 'GET_PROJECTS_SUCCESS',
    SET_PROJECT_VOTE_SUCCESS: 'SET_PROJECT_VOTE_SUCCESS',
    PROJECTS_FAILURE: 'PROJECTS_FAILURE',
};


export const getProjects = () => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get('/projects');
            dispatch(getProjectsSuccess(response.data))
        } catch (e) {
            console.log(e.message);
        }
    }
};

export const setVoteProject = (id, data) => {
    return async dispatch => {
        try {
            const response = await axiosInstance.post(`/projects/${ id }/voting`, data);
            dispatch(setVoteProjectsSuccess(response.data));
        } catch (e) {
            console.log(e.message);
        }
    }
};


export const getProjectsSuccess = projects => {
    return {
        type: types.GET_PROJECTS_SUCCESS,
        payload: {
            projects,
        }
    }
};

export const setVoteProjectsSuccess = project => {
    return {
        type: types.SET_PROJECT_VOTE_SUCCESS,
        payload: {
            project,
        }
    }
};
