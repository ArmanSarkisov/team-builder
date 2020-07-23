import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';

// store
import * as registerActions from '../../store/register/actions';

const Home = ({ user, companies }) => {

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const handleUpdateSubmit = useCallback(data => {
        const compId = data.companyId;
        data.companyId = parseInt(compId);
        dispatch(registerActions.userUpdate(data));
    }, [dispatch]);

    return <div>
        <Container>
            <Form onSubmit={handleSubmit(handleUpdateSubmit)}>
                <Form.Field>
                    <label>First Name</label>
                    <input
                        ref={register({required: true, maxLength: 20})}
                        name="firstName"
                        placeholder='First Name'
                        defaultValue={user.firstName}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input
                        ref={register({required: true, maxLength: 20})}
                        placeholder='Last Name'
                        name="lastName"
                        defaultValue={user.lastName}
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
                        defaultValue={user.email}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Birth Date</label>
                    <input
                        ref={register({required: true})}
                        type="date"
                        placeholder='Birth Date'
                        name="birthDate"
                        defaultValue={user.birthDate}
                    />
                </Form.Field>
                <Form.Field>
                    <label>JS Experience</label>
                    <input
                        ref={register({required: true})}
                        type="number"
                        placeholder='JS Experience'
                        name="jsExperience"
                        defaultValue={user.jsExperience}
                    />
                </Form.Field>
                <Form.Field>
                    <label>React Experience</label>
                    <input
                        ref={register({required: true})}
                        type="number"
                        placeholder='React Experience'
                        name="reactExperience"
                        defaultValue={user.reactExperience}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Avatar</label>
                    <input
                        ref={register({required: true})}
                        type="text"
                        placeholder='Avatar'
                        name="avatarUrl"
                        defaultValue={user.avatarUrl}
                    />
                </Form.Field>
                <Form.Field>
                    <select defaultValue={user.sex} name="sex" ref={register({required: true})}>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                </Form.Field>
                <Form.Field>
                    <select defaultValue={user.companyId} name="companyId" ref={register({required: true})}>
                        {companies.map(company => {
                            return <option key={company.id} value={company.id}>{company.name}</option>
                        })}
                    </select>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    </div>
};


export default Home;
