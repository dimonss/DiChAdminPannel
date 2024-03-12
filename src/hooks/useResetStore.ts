import { useAppDispatch } from 'hooks/reduxHooks';
import { userSlice } from 'store/slices/userSlice';
// import { contentAPI } from 'API/contentAPI';

const useResetStore = () => {
    const dispatch = useAppDispatch();
    const { userSetInitialState } = userSlice.actions;
    return () => {
        dispatch(userSetInitialState());
        // dispatch(contentAPI.util.resetApiState()); //todo has side effect, loop render
    };
};

export default useResetStore;
