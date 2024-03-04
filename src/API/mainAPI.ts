import axios, {AxiosInstance} from 'axios';
import {BaseResponseI} from "types/DTOTypes";
import {GoodsI} from "models/GoodsI";
import {GOODS} from "./endpoints";

const baseURL = 'https://dich.tech/api/';
export const mainAPI: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Authorization': "Basic lorem",
        'content-type': 'application/json',
    },
});

export const getGoods = () =>
    mainAPI.get<BaseResponseI<GoodsI[]>>(GOODS);
