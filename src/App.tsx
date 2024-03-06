import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import useAuthRedirect from 'hooks/useAuthRedirect';
import useAuth from 'hooks/useAuth';
import routes from 'routes';
import { RoutesType } from 'types/global';

const App = () => {
    const getRoutes = (routes: RoutesType[]) =>
        routes.map((route: RoutesType, key: number) => <Route path={route.path} element={<route.component />} key={key} />);
    const { userAuthorized } = useAuthRedirect();
    useAuth();
    return (
        <Routes>
            {!userAuthorized && <Route path={`/auth`} element={<AuthLayout />} />}
            <Route path={`/`} element={<AdminLayout />}>
                {getRoutes(routes)}
            </Route>
        </Routes>
    );
};

export default App;
