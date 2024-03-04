import { AxiosResponse } from 'axios';
import { BaseResponseI } from 'types/DTOTypes';
import STRINGS from 'constants/strings';
import { AxiosError } from 'axios';

export const getResponseErrorMessage = (response: AxiosResponse<BaseResponseI<any>>): string => {
    return response?.data?.message || STRINGS.UNKNOWN_ERROR;
};

export const getHTTPResponseErrorMessage = (error: Error): string => {
    const err = error as AxiosError;
    console.log('HTTP ERROR');
    console.log(err?.message);
    return STRINGS.UNKNOWN_ERROR;
};
