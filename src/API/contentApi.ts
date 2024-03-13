import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CATEGORY, GOODS, NOTIFICATION } from 'API/endpoints';
import { BaseResponseI } from 'types/DTOTypes';
import { GoodsI } from 'models/GoodsI';
import { CategoryI } from 'models/CategoryI';
import { NotificationI } from 'models/NotificationI';
import store from 'store/store';

const baseUrl = process.env.REACT_APP_BASE_URL;

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
    tagTypes: ['UPDATE_CATEGORY'],
    endpoints: (build) => ({
        //GOODS/////////////////////////////////////////////////////////////////////////////////////////////////////////
        fetchGoods: build.query<BaseResponseI<GoodsI[]>, string>({
            query: () => ({ url: GOODS }),
        }),

        //CATEGORY//////////////////////////////////////////////////////////////////////////////////////////////////////
        addCategory: build.mutation<BaseResponseI<null>, string>({
            query: (name) => ({ url: CATEGORY, method: 'POST', body: { name } }),
            invalidatesTags: ['UPDATE_CATEGORY'],
        }),
        fetchCategory: build.query<BaseResponseI<CategoryI[]>, string>({
            query: () => ({ url: CATEGORY }),
            providesTags: ['UPDATE_CATEGORY'],
        }),
        updateCategory: build.mutation<BaseResponseI<null>, { id: string; newName: string }>({
            query: ({ id, newName }) => ({ url: CATEGORY + id, method: 'PATCH', body: { name: newName } }),
            invalidatesTags: ['UPDATE_CATEGORY'],
        }),
        deleteCategory: build.mutation<BaseResponseI<null>, string>({
            query: (id) => ({ url: CATEGORY + id, method: 'DELETE' }),
            invalidatesTags: ['UPDATE_CATEGORY'],
        }),

        //NOTIFICATIONS/////////////////////////////////////////////////////////////////////////////////////////////////
        fetchNotifications: build.query<BaseResponseI<NotificationI[]>, string>({
            query: () => ({ url: NOTIFICATION }),
        }),
    }),
});
