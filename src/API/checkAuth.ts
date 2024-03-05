import { AxiosInstance } from 'axios';

const checkAuth = (api: AxiosInstance, error: any) => {
    if (error?.response?.status === 401) {
        const store = require('store/store').default;
        const { userSlice } = require('store/slices/userSlice');
        const { logout } = userSlice.actions;
        store.dispatch(logout());
    }
};
export default checkAuth;
