import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GOODS } from 'API/endpoints';
import { BaseResponseI } from 'types/DTOTypes';
import { GoodsI } from 'models/GoodsI';
import store from 'store/store';

const baseUrl = 'https://dich.tech/api/';

export const mainAPIRTKQuery = createApi({
    reducerPath: 'mainAPI',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Authorization', store.getState().user.token);
            return headers;
        },
        // @ts-ignore
        responseHandler: (response: Response): Response => {
            console.log('responseHandler');
            console.log(response.status);
            if (response.status === 401) {
                const store = require('store/store').default;
                const { userSlice } = require('store/slices/userSlice');
                const { logout } = userSlice.actions;
                store.dispatch(logout());
                return null;
            }
            // @ts-ignore
            return response.json();
        },
    }),
    endpoints: (build) => ({
        fetchGoods: build.query<BaseResponseI<GoodsI[]>, string>({
            query: () => ({ url: GOODS }),
        }),
    }),
});
