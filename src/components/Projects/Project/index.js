import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card } from 'semantic-ui-react';

// store
import * as projectsActions from '../../../store/projects/actions';


const Project = ({ id, title, votingsCount, description, votedByMe }) => {

    const dispatch = useDispatch();

    const voteProject = useCallback((id, type) => {
        dispatch(projectsActions.setVoteProject(id, { type: type ? 'unlike' : 'like' }));
    }, [dispatch]);

    return <Card style={ { marginTop: 10 } }>
        <Card.Content>
            <Card.Header>{ title }</Card.Header>
            <Card.Description>
                Voted <strong>{ votingsCount }</strong>
                <br/>
                {description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Button
                    basic
                    color='green'
                    onClick={() => voteProject(id, votedByMe)}
                >
                    { votedByMe ? 'Unlike' : 'Like' }
                </Button>
            </div>
        </Card.Content>
    </Card>
};


export default Project;
