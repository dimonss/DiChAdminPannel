import { combineReducers, configureStore } from '@reduxjs/toolkit';
import goods from './slices/goodsSlice';
import user from './slices/userSlice';
import { loadState, saveState } from 'utils/localstorageUtils';

export const rootReducer = combineReducers({
    user,
    goods,
});
const preloadedState = loadState();

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
        devTools: true,
    });

export const store = setupStore();

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export default store;
