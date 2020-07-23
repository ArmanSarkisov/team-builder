import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';

// store
import * as registerActions from '../../store/register/actions';

const Register = ({ companies }) => {

    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const handleRegisterSubmit = useCallback(data => {
        const compId = data.companyId;
        data.companyId = parseInt(compId);
        dispatch(registerActions.userRegister(data));
    }, [dispatch]);

    return (
        <div>
            <Form onSubmit={handleSubmit(handleRegisterSubmit)}>
                <Form.Field>
                    <label>First Name</label>
                    <input ref={register({required: true, maxLength: 20})} name="firstName" placeholder='First Name' />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        ref={register({required: true, maxLength: 20})}
                        placeholder='Last Name'
                        name="lastName"
                    />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input
                        // eslint-disable-next-line
                        ref={register({required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
                        type="email"
                        placeholder='Email'
                        name="email"
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input ref={register({required: true, maxLength: 20})} type="password" placeholder='Password' name="password" />
                </Form.Field>
                <Form.Field>
                    <label>Birth Date</label>
                    <input ref={register({required: true})} type="date" placeholder='Birth Date' name="birthDate" />
                </Form.Field>
                <Form.Field>
                    <label>JS Experience</label>
                    <input ref={register({required: true})} type="number" placeholder='JS Experience' name="jsExperience" />
                </Form.Field>
                <Form.Field>
                    <label>React Experience</label>
                    <input ref={register({required: true})} type="number" placeholder='React Experience' name="reactExperience" />
                </Form.Field>
                <Form.Field>
                    <label>Avatar</label>
                    <input ref={register({required: true})} type="text" placeholder='Avatar' name="avatarUrl" />
                </Form.Field>
                <Form.Field>
                    <select name="sex" ref={register({required: true})}>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </Form.Field>
                <Form.Field>
                    <select name="companyId" ref={register({required: true})}>
                        {companies.map(company => {
                            return <option key={company.id} value={company.id}>{company.name}</option>
                        })}
                    </select>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    );
};

export default Register;
