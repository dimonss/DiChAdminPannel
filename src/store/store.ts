import { combineReducers, configureStore } from '@reduxjs/toolkit';
import content from 'store/slices/contentSlice';
import user from './slices/userSlice';
import { loadState, saveState } from 'utils/localstorageUtils';
import { mainAPIRTKQuery } from 'API/mainAPIRTKQuery';
import { rtkQueryErrorLogger } from 'API/checkAuth';

export const rootReducer = combineReducers({
    user,
    content,
    [mainAPIRTKQuery.reducerPath]: mainAPIRTKQuery.reducer,
});
const preloadedState = loadState();

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
        devTools: true,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainAPIRTKQuery.middleware).concat(rtkQueryErrorLogger),
    });

export const store = setupStore();

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export default store;
