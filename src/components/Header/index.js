import React, { useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';
import classNames from 'classnames/bind';

// styles
import styles from './Header.module.scss';

// store
import * as loginActions from '../../store/login/actions';
import loginSelector from '../../store/login/selector';

const cx = classNames.bind(styles);

const Header = () => {

    const { push } = useHistory();

    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector(loginSelector);

    const handleLogout = useCallback(() => {
        dispatch(loginActions.logoutUser());
        push('/auth/login');
    }, [dispatch, push]);

    return <header>
        <Container>
            <Menu secondary>
                { isLoggedIn && <> <Menu.Item
                    name='home'
                    link
                    className={ cx('menu_item') }
                >
                    <NavLink to="/">Home</NavLink>
                </Menu.Item>
                    <Menu.Item
                        name='topics'
                        link
                        className={ cx('menu_item') }
                    >
                        <NavLink to="/topics">Topics</NavLink>
                    </Menu.Item>
                    <Menu.Item
                        name='projects'
                        link
                        className={ cx('menu_item') }
                    >
                        <NavLink to="/projects">Projects</NavLink>
                    </Menu.Item>
                    <Menu.Item
                        name='teams'
                        link
                        className={ cx('menu_item') }
                    >
                        <NavLink to="/teams">Teams</NavLink>
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='logout'
                            link
                            className={ cx('menu_item') }
                            onClick={ handleLogout }
                        />
                    </Menu.Menu>
                </> }
            </Menu>
        </Container>
    </header>;
};


export default Header;
