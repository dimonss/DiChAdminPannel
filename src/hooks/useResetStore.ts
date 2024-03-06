import { userSlice } from 'store/slices/userSlice';
import { contentSlice } from 'store/slices/contentSlice';
import { useDispatch } from 'react-redux';

const useResetStore = () => {
    const dispatch = useDispatch();
    const { contentSetInitialState } = contentSlice.actions;
    const { userSetInitialState } = userSlice.actions;
    return () => {
        dispatch(contentSetInitialState());
        dispatch(userSetInitialState());
    };
};

export default useResetStore;
