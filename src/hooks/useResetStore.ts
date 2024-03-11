import { userSlice } from 'store/slices/userSlice';
import { contentSlice } from 'store/slices/contentSlice';
import { useAppDispatch } from 'hooks/reduxHooks';
import { mainAPIRTKQuery } from 'API/mainAPIRTKQuery';

const useResetStore = () => {
    const dispatch = useAppDispatch();
    const { contentSetInitialState } = contentSlice.actions;
    const { userSetInitialState } = userSlice.actions;
    return () => {
        dispatch(contentSetInitialState());
        dispatch(userSetInitialState());
        dispatch(mainAPIRTKQuery.util.resetApiState());
    };
};

export default useResetStore;
