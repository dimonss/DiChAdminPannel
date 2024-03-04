import React from 'react';
import './assets/css/App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <ChakraProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path={`/auth`} component={AuthLayout} />
                    <Route path={`/admin`} component={AdminLayout} />
                    <Route path={`/rtl`} component={RTLLayout} />
                    <Redirect from="/" to="/admin" />
                </Switch>
            </BrowserRouter>
        </Provider>
    </ChakraProvider>,
);
