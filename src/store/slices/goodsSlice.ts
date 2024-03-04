import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_RESPONSE_STATUS, BaseResponseI } from 'types/DTOTypes';
import { GoodsI } from 'models/GoodsI';
import { getHTTPResponseErrorMessage, getResponseErrorMessage } from 'utils/APIUtils';
import { getGoods } from 'API/mainAPI';

export interface GoodsReduxI {
    goods: GoodsI[];
    isLoading: boolean;
    error: any;
    counter: number;
}

const initialState: GoodsReduxI = {
    goods: [],
    isLoading: false,
    error: '',
    counter: 160,
};

export const fetchGoods = createAsyncThunk('goods/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await getGoods();
        if (response.data.status === API_RESPONSE_STATUS.OK) return response.data;
        else return thunkAPI.rejectWithValue(getResponseErrorMessage(response));
    } catch (err: any) {
        return thunkAPI.rejectWithValue(getHTTPResponseErrorMessage(err));
    }
});

export const goodSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        increment(state, action: PayloadAction<number>) {
            state.counter += action.payload;
        },
        decrement(state, action: PayloadAction<number>) {
            state.counter -= action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGoods.fulfilled, (state, action: PayloadAction<BaseResponseI<GoodsI[]>>) => {
            state.isLoading = false;
            state.error = null;
            state.goods = action.payload.data;
        });
        builder.addCase(fetchGoods.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchGoods.rejected, (state, action) => {
            console.log('action');
            console.log(action);
            state.isLoading = true;
            state.error = action.payload;
        });
    },
});

export default goodSlice.reducer;
