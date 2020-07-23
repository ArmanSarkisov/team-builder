import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// private routing
import PrivateRoute from './privateRoute';

// pages
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Topics from '../pages/Topics';
import Projects from '../pages/Projects';
import Teams from '../pages/Teams';

const Routes = () => {
    return <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/topics" component={Topics} />
        <PrivateRoute path="/projects" component={Projects} />
        <PrivateRoute path="/teams" component={Teams} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
        <Redirect from="*" to="/" />
    </Switch>
};


export default Routes;
