import axiosInstance from '../../api';

export const types = {
    GET_TEAMS_SUCCESS: 'GET_TEAMS_SUCCESS',
    GET_TEAMS_FAILURE: 'GET_TEAMS_FAILURE',
};


export const getTeams = () => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get('/teams');
            dispatch(getTeamsSuccess(response.data))
        } catch (e) {
            console.log(e.message);
        }
    }
};


export const getTeamsSuccess = teams => {
    return {
        type: types.GET_TEAMS_SUCCESS,
        payload: {
            teams
        }
    }
};
