import React from 'react';
import classNames from 'classnames/bind';

// styles
import styles from './Projects.module.scss';

// store
import { Container } from 'semantic-ui-react';

// components
import Project from './Project';

const cx = classNames.bind(styles);

const Projects = ({ projects }) => {
    return <Container>
        <div className={cx('projects')}>
            { projects.map(item => {
                return <Project
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    votedByMe={item.votedByMe}
                    votingsCount={item.votingsCount}
                />;
            }) }
        </div>
    </Container>;
};


export default Projects;
