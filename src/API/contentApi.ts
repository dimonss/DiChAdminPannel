import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CATEGORY, CLIENTS, EXCHANGE_RATE, GOODS, NOTIFICATION } from 'API/endpoints';
import { BaseResponseI } from 'types/DTOTypes';
import { GoodsI, GoodsPostI } from 'models/GoodsI';
import { CategoryI } from 'models/CategoryI';
import store from 'store/store';
import { ClientI } from 'models/ClientI';
import { NullableString, StringKeyValueI } from 'types/globalTypes';
import { NotificationI } from 'models/NotificationI';
import { ExchangeRateI } from 'models/ExchangeRate';

const baseUrl = process.env.REACT_APP_BASE_API_URL;

const TAG: StringKeyValueI = {
    NOTIFICATION: 'NOTIFICATION',
    CATEGORY: 'CATEGORY',
    GOODS: 'GOODS',
};

interface NotificationForUpdateI {
    title: NullableString;
    description: NullableString;
    img: NullableString;
}

interface NotificationPostI extends NotificationForUpdateI {
    id: number;
}

export const contentApi = createApi({
    reducerPath: 'contentApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Authorization', store.getState().user.token);
            headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
            headers.set('Pragma', 'no-cache');
            headers.set('Expires', '0');
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
    keepUnusedDataFor: 0,
    tagTypes: [TAG.CATEGORY, TAG.NOTIFICATION, TAG.GOODS],
    endpoints: (build) => ({
        //GOODS/////////////////////////////////////////////////////////////////////////////////////////////////////////
        addGood: build.mutation<BaseResponseI<null>, GoodsPostI>({
            query: (body) => ({ url: GOODS, method: 'POST', body }),
            invalidatesTags: [TAG.GOODS],
        }),
        fetchGoods: build.query<BaseResponseI<GoodsI[]>, string>({
            query: () => ({ url: GOODS }),
            providesTags: [TAG.GOODS],
        }),
        updateGood: build.mutation<BaseResponseI<null>, GoodsPostI>({
            query: (body) => ({ url: GOODS, method: 'PUT', body }),
            invalidatesTags: [TAG.GOODS],
        }),
        deleteGood: build.mutation<BaseResponseI<null>, string>({
            query: (id) => ({ url: GOODS + id, method: 'DELETE' }),
            invalidatesTags: [TAG.GOODS],
        }),

        //CATEGORY//////////////////////////////////////////////////////////////////////////////////////////////////////
        addCategory: build.mutation<BaseResponseI<null>, string>({
            query: (name) => ({ url: CATEGORY, method: 'POST', body: { name } }),
            invalidatesTags: [TAG.CATEGORY],
        }),
        fetchCategory: build.query<BaseResponseI<CategoryI[]>, string>({
            query: () => ({ url: CATEGORY }),
            providesTags: [TAG.CATEGORY],
        }),
        updateCategory: build.mutation<BaseResponseI<null>, { id: string; newName: string }>({
            query: ({ id, newName }) => ({ url: CATEGORY + id, method: 'PATCH', body: { name: newName } }),
            invalidatesTags: [TAG.CATEGORY],
        }),
        deleteCategory: build.mutation<BaseResponseI<null>, string>({
            query: (id) => ({ url: CATEGORY + id, method: 'DELETE' }),
            invalidatesTags: [TAG.CATEGORY],
        }),

        //NOTIFICATIONS/////////////////////////////////////////////////////////////////////////////////////////////////
        addNotification: build.mutation<BaseResponseI<null>, NotificationForUpdateI>({
            query: (body) => ({ url: NOTIFICATION, method: 'POST', body }),
            invalidatesTags: [TAG.NOTIFICATION],
        }),
        fetchNotifications: build.query<BaseResponseI<NotificationI[]>, string>({
            query: () => ({ url: NOTIFICATION }),
            providesTags: [TAG.NOTIFICATION],
        }),
        updateNotification: build.mutation<BaseResponseI<null>, NotificationPostI>({
            query: (body) => ({ url: NOTIFICATION, method: 'PUT', body }),
            invalidatesTags: [TAG.NOTIFICATION],
        }),
        deleteNotification: build.mutation<BaseResponseI<null>, string>({
            query: (id) => ({ url: NOTIFICATION + id, method: 'DELETE' }),
            invalidatesTags: [TAG.NOTIFICATION],
        }),
        //CLIENTS/////////////////////////////////////////////////////////////////////////////////////////////////
        fetchClients: build.query<BaseResponseI<ClientI[]>, string>({
            query: () => ({ url: CLIENTS }),
        }),
        //EXCHANGE RATE/////////////////////////////////////////////////////////////////////////////////////////////////
        fetchExchangeRate: build.query<BaseResponseI<ExchangeRateI[]>, string>({
            query: () => ({ url: EXCHANGE_RATE }),
        }),
    }),
});
