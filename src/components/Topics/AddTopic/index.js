import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';

// store
import * as topicsActions from '../../../store/topics/actions';

const AddTopic = () => {

    const { register, handleSubmit, reset } = useForm();

    const dispatch = useDispatch();

    const handleAddNewTopicSubmit = useCallback(data => {
        dispatch(topicsActions.setNewTopic(data));
        reset();
    }, [dispatch,reset]);

    return <Card style={ { marginTop: 10 } }>
        <Card.Content>
            <Card.Header>Add New Topic</Card.Header>
            <Form onSubmit={ handleSubmit(handleAddNewTopicSubmit) }>
                <Form.Field>
                    <input ref={ register({ required: true }) } name="title" placeholder='Add New Topic' />
                </Form.Field>
                <Button
                    basic
                    color='green'
                    type="submit"
                >
                    Add New Topic
                </Button>
            </Form>
        </Card.Content>
    </Card>
};

export default AddTopic;
