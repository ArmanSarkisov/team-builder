import axiosInstance from '../../api';

export const types =  {
    USER_IS_LOG_IN_SUCCESS: 'USER_IS_LOG_IN_SUCCESS',
    USER_IS_LOG_OUT_SUCCESS: 'USER_IS_LOG_OUT',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
};


export const loginUser = (data) => {
    return async dispatch => {
        try {
            const response = await axiosInstance.post('/users/login', data);
            dispatch(setUserLoginSuccess(response.data));
        } catch (e) {
            console.log(e.message, 'Something went wrong');
        }
    }
};

export const logoutUser = () => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get('/users/logout');
            dispatch(userLogoutSuccess(response.data));
        } catch (e) {
            console.log(e.message, 'Something went wrong');
        }
    }
};

export const getUser = () => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get('/users');
            dispatch(getUserSuccess(response.data));
        } catch (e) {
            console.log(e.message, 'Something went wrong');
        }
    }
};

export const setUserLoginSuccess = user => {
    return {
        type: types.USER_IS_LOG_IN_SUCCESS,
        payload: {
            user,
        }
    }
};

export const getUserSuccess = user => {
    return {
        type: types.GET_USER_SUCCESS,
        payload: {
            user,
        }
    }
};

export const userLogoutSuccess = user => {
    return {
        type: types.USER_IS_LOG_OUT_SUCCESS,
        payload: {
            user,
        }
    }
};
