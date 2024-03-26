import { NullableString } from 'types/globalTypes';

export interface ClientI {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    login: NullableString;
    password: NullableString;
    phoneNumber: string;
    photo: string;
    chatId: string;
    token: string;
    otp: NullableString;
    favoriteProduct: string;
    cart: string;
    discount: number;
    notification: string;
    regDate: string;
}
