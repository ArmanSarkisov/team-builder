import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// store
import * as registerActions from '../../store/register/actions';
import registerSelector from '../../store/register/selector';

// components
import RegisterContent from '../../components/Register';

const Register = () => {

    const { push } = useHistory();

    const dispatch = useDispatch();

    const { companies, registeredUser } = useSelector(registerSelector);

    useEffect(() => {
        dispatch(registerActions.getCompanies());
    }, [dispatch]);

    useEffect(() => {
        if(registeredUser.data) {
            push('/auth/login')
        }
    }, [registeredUser, push]);


    return <RegisterContent companies={companies} />
};

export default Register;
