import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import { useAppSelector } from 'hooks/reduxHooks';
import { AUTH, GOODS } from 'constants/urls';

const App = () => {
    const history = useHistory();
    const { loggedIn } = useAppSelector((store) => store.user);

    useEffect(() => {
        if (loggedIn) history.replace(GOODS);
        else history.replace(AUTH);
    }, [loggedIn, history]);
    return (
        <Switch>
            {!loggedIn && <Route path={`/auth`} component={AuthLayout} />}
            <Route path={`/admin`} component={AdminLayout} />
            <Redirect from="/" to="/admin" />
        </Switch>
    );
};

export default App;
