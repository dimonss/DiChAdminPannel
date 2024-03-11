import { useEffect } from 'react';
import { useAppSelector } from 'hooks/reduxHooks';
import { mainAPI } from 'API/mainAPI';

const useAuth = (): null => {
    const {token} = useAppSelector((state) => state.user);
    // const { closeSnackbar } = useSnackbar();

    useEffect(() => {
        mainAPI.defaults.headers.common.Authorization = token;
        // closeSnackbar();
    }, [token]);
    return null;
};

export default useAuth;
