import axiosInstance from '../../api';

export const types =  {
    GET_COMPANIES_SUCCESS: 'GET_COMPANIES_SUCCESS',
    GET_COMPANIES_FAILURE: 'GET_COMPANIES_FAILURE',
    USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
    USER_REGISTER_FAILURE: 'USER_REGISTER_FAILURE',
};


export const getCompanies = () => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get('/companies');
            dispatch(setCompaniesSuccess(response.data))
        } catch (e) {
            dispatch(setCompaniesFailure(e.message));
        }
    }
};

export const userRegister = data => {
    return async dispatch => {
        try {
            const response = await axiosInstance.post('/users/register', data);
            dispatch(setUserRegisterSuccess(response.data));
        } catch (e) {
            dispatch(setCompaniesFailure(e.message));
        }
    }
};

export const userUpdate = data => {
    return async dispatch => {
        try {
            const response = await axiosInstance.put('/users/update', data);
            dispatch(setUserRegisterSuccess(response.data));
        } catch (e) {
            dispatch(setCompaniesFailure(e.message));
        }
    }
};

export const setUserRegisterSuccess = data => {
    return {
        type: types.USER_REGISTER_SUCCESS,
        payload: {
            data,
        }
    }
};

export const setCompaniesSuccess = companies => {
    return {
        type: types.GET_COMPANIES_SUCCESS,
        payload: {
            companies,
        }
    }
};

export const setCompaniesFailure = message => {
    return {
        type: types.GET_COMPANIES_FAILURE,
        payload: {
            message,
        }
    }
};
