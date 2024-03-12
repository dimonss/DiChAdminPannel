import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './slices/userSlice';
import { loadState, saveState } from 'utils/localstorageUtils';
import { contentApi } from 'API/contentApi';
import { rtkQueryErrorLogger } from 'API/rtkQueryErrorLogger';
import { exchangeRatesApi } from 'API/exchangeRatesAPI';

export const rootReducer = combineReducers({
    user,
    [contentApi.reducerPath]: contentApi.reducer,
    [exchangeRatesApi.reducerPath]: exchangeRatesApi.reducer,
});
const preloadedState = loadState();

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(contentApi.middleware).concat(exchangeRatesApi.middleware).concat(rtkQueryErrorLogger),
    });

export const store = setupStore();

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export default store;
