import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// store
import * as topicsActions from '../../store/topics/actions';
import topicsSelector from '../../store/topics/selector';

// components
import TopicsContent from '../../components/Topics';

const Topics = () => {

    const dispatch = useDispatch();

    const { topics } = useSelector(topicsSelector);

    useEffect(() => {
        dispatch(topicsActions.getTopics());
    }, [dispatch]);

    return <TopicsContent topics={topics} />;
};


export default Topics;
