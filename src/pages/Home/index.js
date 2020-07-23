import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// store
import loginSelector from '../../store/login/selector';
import registerSelector from '../../store/register/selector';
import * as registerActions from '../../store/register/actions';

// components
import HomeContent from '../../components/Home'

const Home = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(loginSelector);
    const { companies } = useSelector(registerSelector);

    useEffect(() => {
        dispatch(registerActions.getCompanies());
    }, [dispatch]);

    return <HomeContent companies={companies} user={user} />
};


export default Home;
