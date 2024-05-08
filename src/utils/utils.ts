import { BUILD_TYPE, PATH_TO_IMAGE } from 'constants/globalConstants';

export const getFullPathToImg = (img: string) =>
    process.env.REACT_APP_BUILD_TYPE === BUILD_TYPE.LOCAL
        ? 'http://localhost/api/' + PATH_TO_IMAGE + img
        : process.env.REACT_APP_BASE_API_URL + PATH_TO_IMAGE + img;
