import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../Context/AuthContext';

import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { Users } from '../pages/Users';
import { AddUser } from '../pages/AddUser';
import { ViewUser } from '../pages/ViewUser';
import { EditUser } from '../pages/EditUser';

function CustomRoute({ isPrivate, ...rest }) {
    const { authenticated } = useContext(Context);

    if (isPrivate && !authenticated) {
        return <Redirect to="/" />
    }
    return <Route { ...rest} />
}

export default function RoutesAdm() {
    return (
        <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute isPrivate path="/dashboard" component={Dashboard} />
            <CustomRoute isPrivate path="/users" component={Users} />
            <CustomRoute isPrivate path="/add-user" component={AddUser} />
            <CustomRoute isPrivate path="/view-user/:id" component={ViewUser} />
            <CustomRoute isPrivate path="/edit-user/:id" component={EditUser} />
        </Switch>
    );
};