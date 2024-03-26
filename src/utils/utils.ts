import { BUILD_TYPE, PATH_TO_CLIENTS_IMAGE } from 'constants/globalConstants';

export const getFullPathToUserPhoto = (img: string) =>
    process.env.REACT_APP_BUILD_TYPE === BUILD_TYPE.LOCAL
        ? 'http://localhost/api/' + PATH_TO_CLIENTS_IMAGE + img
        : process.env.REACT_APP_BASE_API_URL + PATH_TO_CLIENTS_IMAGE + img;
