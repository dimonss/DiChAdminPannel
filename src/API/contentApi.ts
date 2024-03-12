import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CATEGORY, GOODS, NOTIFICATION } from 'API/endpoints';
import { BaseResponseI } from 'types/DTOTypes';
import { GoodsI } from 'models/GoodsI';
import { CategoryI } from 'models/CategoryI';
import { NotificationI } from 'models/NotificationI';
import store from 'store/store';

const baseUrl = 'https://dich.tech/api/';

export const contentApi = createApi({
    reducerPath: 'contentApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Authorization', store.getState().user.token);
            return headers;
        },
        responseHandler: (response: Response): Promise<BaseResponseI<any>> => {
            if (response.status === 401) {
                const store = require('store/store').default;
                const { userSlice } = require('store/slices/userSlice');
                const { logout } = userSlice.actions;
                store.dispatch(logout());
                return null;
            }
            return response.json();
        },
    }),
    endpoints: (build) => ({
        fetchGoods: build.query<BaseResponseI<GoodsI[]>, string>({
            query: () => ({ url: GOODS }),
        }),
        fetchCategory: build.query<BaseResponseI<CategoryI[]>, string>({
            query: () => ({ url: CATEGORY }),
        }),
        fetchNotifications: build.query<BaseResponseI<NotificationI[]>, string>({
            query: () => ({ url: NOTIFICATION }),
        }),
    }),
});
