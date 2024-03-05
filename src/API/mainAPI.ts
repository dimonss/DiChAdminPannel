import axios, { AxiosInstance } from 'axios';
import { BaseResponseI } from 'types/DTOTypes';
import { GoodsI } from 'models/GoodsI';
import { GOODS } from './endpoints';
import checkAuth from 'API/checkAuth';

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
