import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'semantic-ui-react';

// store
import * as loginActions from '../../store/login/actions';
import loginSelector from '../../store/login/selector';

const Login = () => {

    const { push } = useHistory();

    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const { user: { token } } = useSelector(loginSelector);

    const handleRegisterSubmit = useCallback(data => {
        dispatch(loginActions.loginUser(data));
    }, [dispatch]);

    const handleGoRegister = useCallback(() => {
        push('/auth/register');
    }, [push]);

    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    useEffect(() => {
        if(token) {
            localStorage.setItem('token', token);
            push('/');
        }
    }, [token, push]);

    return <div>
        <Form onSubmit={handleSubmit(handleRegisterSubmit)}>
            <Form.Field>
                <label>Email</label>
                <input ref={register({required: true})} name="email" placeholder='Email' />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input ref={register({required: true})} name="password" placeholder='Password' />
            </Form.Field>
            <Button type='submit'>Login</Button>
        </Form>
        <Button primary onClick={handleGoRegister}>
            Registration
        </Button>
    </div>
};

export default Login;
