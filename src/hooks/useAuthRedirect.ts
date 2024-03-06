import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';
import { AUTH, GOODS } from 'constants/urls';

const useAuthRedirect = () => {
    const navigate = useNavigate();
    const { loggedIn } = useAppSelector((store) => store.user);
    const [userAuthorized, setUserAuthorized] = useState(false); //crutch for normalized redirect from login page to home page
    useEffect(() => {
        if (loggedIn) {
            navigate(GOODS, { replace: true });
            setUserAuthorized(true);
        } else {
            setUserAuthorized(false);
            navigate(AUTH, { replace: true });
        }
    }, [loggedIn]); // eslint-disable-line
    return { userAuthorized };
};

export default useAuthRedirect;
