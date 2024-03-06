import { useEffect } from 'react';
import { useAppSelector } from 'hooks/reduxHooks';
import { mainAPI } from 'API/mainAPI';

const useAuth = (): null => {
    const auth = useAppSelector((state) => state.user.auth);
    // const { closeSnackbar } = useSnackbar();

    useEffect(() => {
        mainAPI.defaults.auth = auth;
        // closeSnackbar();
    }, [auth]);
    return null;
};

export default useAuth;
