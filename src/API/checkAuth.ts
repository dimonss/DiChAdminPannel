import { AxiosInstance } from 'axios';

import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

const checkAuth = (api: AxiosInstance, error: any) => {
    if (error?.response?.status === 401) {
        const store = require('store/store').default;
        const { userSlice } = require('store/slices/userSlice');
        const { logout } = userSlice.actions;
        store.dispatch(logout());
    }
};
export default checkAuth;

/**
 * Log a warning and show a toast!
 */
//first argument is API
export const rtkQueryErrorLogger: Middleware = (_: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    console.log('action');
    console.log(action);
    if (isRejectedWithValue(action)) {
        console.warn('We got a rejected action!');
        console.log(action);
    }

    return next(action);
};
