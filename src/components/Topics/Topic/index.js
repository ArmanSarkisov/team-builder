import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card } from 'semantic-ui-react';

// store
import * as topicsActions from '../../../store/topics/actions';

const Topic = ({ id, title, votingsCount, votedByMe, canDelete }) => {

    const dispatch = useDispatch();

    const voteTopic = useCallback((id, type) => {
        dispatch(topicsActions.setVoteTopic(id, { type: type ? 'unlike' : 'like' }));
    }, [dispatch]);

    const handleDeleteTopic = useCallback(id => {
        dispatch(topicsActions.deleteTopic(id));
    }, [dispatch]);

    return <Card style={ { marginTop: 10 } }>
        <Card.Content>
            <Card.Header>{ title }</Card.Header>
            <Card.Description>
                Voted <strong>{ votingsCount }</strong>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Button
                    basic
                    color='green'
                    onClick={ () => voteTopic(id, votedByMe) }
                >
                    { votedByMe ? 'Unlike' : 'Like' }
                </Button>
                <Button
                    disabled={ !canDelete }
                    basic
                    color='red'
                    onClick={() => handleDeleteTopic(id)}
                >
                    Delete
                </Button>
            </div>
        </Card.Content>
    </Card>;
};


export default Topic;
