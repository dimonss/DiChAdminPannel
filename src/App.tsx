import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import useAuthRedirect from 'hooks/useAuthRedirect';

const App = () => {
    const { renderAuthPage } = useAuthRedirect();
    return (
        <Switch>
            {renderAuthPage && <Route path={`/auth`} component={AuthLayout} />}
            <Route path={`/admin`} component={AdminLayout} />
            <Redirect from="/" to="/admin" />
        </Switch>
    );
};

export default App;
