import axios, { AxiosInstance } from 'axios';
import { BaseResponseI } from 'types/DTOTypes';
import { GoodsI } from 'models/GoodsI';
import { CATEGORY, GOODS, NOTIFICATION } from './endpoints';
import checkAuth from 'API/checkAuth';
import { CategoryI } from 'models/CategoryI';
import { NotificationI } from 'models/NotificationI';

const baseURL = 'https://dich.tech/api/';
export const mainAPI: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'content-type': 'application/json',
    },
});

mainAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        checkAuth(mainAPI, error);
    },
);

export const getGoods = () => mainAPI.get<BaseResponseI<GoodsI[]>>(GOODS);
export const getCategory = () => mainAPI.get<BaseResponseI<CategoryI[]>>(CATEGORY);
export const getNotification = () => mainAPI.get<BaseResponseI<NotificationI[]>>(NOTIFICATION);
