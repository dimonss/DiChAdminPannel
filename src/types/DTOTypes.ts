export enum API_RESPONSE_STATUS {
    OK = 'OK',
    ERROR = 'ERROR',
}

export interface BaseResponseI<Data> {
    data: Data;
    status: API_RESPONSE_STATUS;
    message: string;
}
