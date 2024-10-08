import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './slices/userSlice';
import { loadState, saveState } from 'utils/localstorageUtils';
import { contentApi } from 'API/contentApi';
import { rtkQueryErrorLogger } from 'API/rtkQueryErrorLogger';
import { BUILD_TYPE } from 'constants/globalConstants';

export const rootReducer = combineReducers({
    user,
    [contentApi.reducerPath]: contentApi.reducer,
});
const preloadedState = loadState();

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
        devTools: process.env.REACT_APP_BUILD_TYPE === BUILD_TYPE.LOCAL,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(contentApi.middleware).concat(rtkQueryErrorLogger),
    });

export const store = setupStore();

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export default store;
