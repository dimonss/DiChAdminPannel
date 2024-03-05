import { userSlice } from 'store/slices/userSlice';
import { goodSlice } from 'store/slices/goodsSlice';
import { useDispatch } from 'react-redux';

const useResetStore = () => {
    const dispatch = useDispatch();
    const { goodsSetInitialState } = goodSlice.actions;
    const { userSetInitialState } = userSlice.actions;
    return () => {
        dispatch(goodsSetInitialState());
        dispatch(userSetInitialState());
    };
};

export default useResetStore;
