import React from 'react';
import { Container } from 'semantic-ui-react';
import classNames from 'classnames/bind';

// styles
import styles from './Topics.module.scss';

// components
import Topic from './Topic';
import AddTopic from './AddTopic';

const cx = classNames.bind(styles);

const Topics = ({ topics }) => {
    return <Container>
        <div className={cx('topics')}>
            <AddTopic />
            { topics.map(item => {
                return <Topic
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    votingsCount={item.votingsCount}
                    votedByMe={item.votedByMe}
                    canDelete={item.canDelete}
                />
            }) }
        </div>
    </Container>;
};


export default Topics;
