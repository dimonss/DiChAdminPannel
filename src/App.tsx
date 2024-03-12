import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import useAuthRedirect from 'hooks/useAuthRedirect';
import routes from 'routes';
import { RoutesType } from 'types/globalTypes';
import GlobalLoader from 'components/loader/GlobalLoader';

const AuthLayout = React.lazy(() => import('layouts/auth'));
const AdminLayout = React.lazy(() => import('layouts/admin'));

const App = () => {
    const getRoutes = (routes: RoutesType[]) =>
        routes.map((route: RoutesType, key: number) => <Route path={route.path} element={<route.component />} key={key} />);
    const { userAuthorized } = useAuthRedirect();
    return (
        <Suspense fallback={<GlobalLoader />}>
            <Routes>
                {!userAuthorized && <Route path={`/auth`} element={<AuthLayout />} />}
                <Route path={`/`} element={<AdminLayout />}>
                    {getRoutes(routes)}
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
