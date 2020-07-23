import React, { useEffect, useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// store
import * as loginActions from '../store/login/actions';

const PrivateRoute = ({ component: Component, ...otherProps }) => {

    const lStorage = useMemo(() => {
        return localStorage.getItem('token');
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        if(lStorage) {
            dispatch(loginActions.getUser());
        }
    }, [dispatch, lStorage]);

    return lStorage ? (
        <Route
            { ...otherProps }
            render={ props => (
                <Component { ...props } />
            ) }
        />
    ) : (
        <Redirect
            to="/auth/login"
        />
    );
};

export default PrivateRoute;
