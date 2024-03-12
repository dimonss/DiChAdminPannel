import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { EXCHANGE_RATE } from 'API/endpoints';
import { CurrencyTypeI } from 'types/globalTypes';

const baseUrl = 'https://v6.exchangerate-api.com/v6/';

const apiKey = process.env.REACT_APP_RATE_API_KEY;

export const exchangeRatesApi = createApi({
    reducerPath: 'exchangeRatesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),

    endpoints: (build) => ({
        fetchExchangeRate: build.query<any, string>({
            query: (currencyType: CurrencyTypeI) => ({ url: `${apiKey}/${EXCHANGE_RATE}/${currencyType}` }),
        }),
    }),
});
