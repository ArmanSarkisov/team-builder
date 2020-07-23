import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// store
import * as teamsActions from '../../store/teams/actions';
import teamsSelector from '../../store/teams/selector';

// components
import TeamsContent from '../../components/Teams';

const Teams = () => {

    const dispatch = useDispatch();

    const { teams } = useSelector(teamsSelector);

    useEffect(() => {
        dispatch(teamsActions.getTeams());
    }, [dispatch]);

    return <TeamsContent teams={teams} />;
};


export default Teams;
