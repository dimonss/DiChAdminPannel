import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';
import { AUTH, GOODS } from 'constants/urls';

const useAuthRedirect = () => {
    const history = useHistory();
    const { loggedIn } = useAppSelector((store) => store.user);
    const [renderAuthPage, setRenderAuthPage] = useState(true); //crutch for normalized redirect from login page to home page
    useEffect(() => {
        if (loggedIn) {
            history.replace(GOODS);
            setRenderAuthPage(!loggedIn);
        } else {
            setRenderAuthPage(true);
            history.replace(AUTH);
        }
    }, [loggedIn, history]);
    return { renderAuthPage };
};

export default useAuthRedirect;
