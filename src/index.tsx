import React from 'react';
import './assets/css/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as HTMLElement);
root.render(
    <BrowserRouter basename={'/shop/admin'}>
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ChakraProvider>
    </BrowserRouter>,
);
