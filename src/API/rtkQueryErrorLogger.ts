import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

//first argument is API
export const rtkQueryErrorLogger: Middleware = (_: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        console.warn('RTK ERROR');
        console.log(action);
    }
    return next(action);
};
