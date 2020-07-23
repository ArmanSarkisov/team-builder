import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// store
import * as projectsActions from '../../store/projects/actions';
import projectsSelector from '../../store/projects/selector';

// components
import ProjectsContent from '../../components/Projects';

const Projects = () => {

    const dispatch = useDispatch();

    const { projects } = useSelector(projectsSelector);

    useEffect(() => {
        dispatch(projectsActions.getProjects());
    }, [dispatch]);

    return <ProjectsContent projects={projects} />
};


export default Projects;
