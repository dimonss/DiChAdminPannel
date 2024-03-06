import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_RESPONSE_STATUS, BaseResponseI } from 'types/DTOTypes';
import { GoodsI } from 'models/GoodsI';
import { getHTTPResponseErrorMessage, getResponseErrorMessage } from 'utils/APIUtils';
import { getCategory, getGoods, getNotification } from 'API/mainAPI';
import { CategoryI } from 'models/CategoryI';
import { NotificationI } from 'models/NotificationI';

export interface InitialDataI {
    data: any[];
    isLoading: boolean;
    error: any;
    counter: number;
}

export interface InitialStateI {
    goods: InitialDataI;
    category: InitialDataI;
    notification: InitialDataI;
    counter: number;
}

const initialDataTemplate: InitialDataI = {
    data: [],
    isLoading: false,
    error: '',
    counter: 160,
};
const initialState: InitialStateI = {
    goods: initialDataTemplate,
    category: initialDataTemplate,
    notification: initialDataTemplate,
    counter: 160,
};

export const fetchGoods = createAsyncThunk('content/goods/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await getGoods();
        if (response.data.status === API_RESPONSE_STATUS.OK) return response.data;
        else return thunkAPI.rejectWithValue(getResponseErrorMessage(response));
    } catch (err: any) {
        return thunkAPI.rejectWithValue(getHTTPResponseErrorMessage(err));
    }
});
export const fetchCategory = createAsyncThunk('content/category/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await getCategory();
        if (response.data.status === API_RESPONSE_STATUS.OK) return response.data;
        else return thunkAPI.rejectWithValue(getResponseErrorMessage(response));
    } catch (err: any) {
        return thunkAPI.rejectWithValue(getHTTPResponseErrorMessage(err));
    }
});
export const fetchNotification = createAsyncThunk('content/notification/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await getNotification();
        if (response.data.status === API_RESPONSE_STATUS.OK) return response.data;
        else return thunkAPI.rejectWithValue(getResponseErrorMessage(response));
    } catch (err: any) {
        return thunkAPI.rejectWithValue(getHTTPResponseErrorMessage(err));
    }
});

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        increment(state, action: PayloadAction<number>) {
            state.counter += action.payload;
        },
        decrement(state, action: PayloadAction<number>) {
            state.counter -= action.payload;
        },
        contentSetInitialState: () => initialState,
    },
    extraReducers: (builder) => {
        //GOODS
        builder.addCase(fetchGoods.fulfilled, (state, action: PayloadAction<BaseResponseI<GoodsI[]>>) => {
            state.goods.isLoading = false;
            state.goods.error = null;
            state.goods.data = action.payload.data;
        });
        builder.addCase(fetchGoods.pending, (state) => {
            state.goods.isLoading = true;
        });
        builder.addCase(fetchGoods.rejected, (state, action) => {
            state.goods.isLoading = false;
            state.goods.error = action.payload;
        });
        //CATEGORY
        builder.addCase(fetchCategory.fulfilled, (state, action: PayloadAction<BaseResponseI<CategoryI[]>>) => {
            state.category.isLoading = false;
            state.category.error = null;
            state.category.data = action.payload.data;
        });
        builder.addCase(fetchCategory.pending, (state) => {
            state.category.isLoading = true;
        });
        builder.addCase(fetchCategory.rejected, (state, action) => {
            state.category.isLoading = false;
            state.category.error = action.payload;
        });
        //NOTIFICATION
        builder.addCase(fetchNotification.fulfilled, (state, action: PayloadAction<BaseResponseI<NotificationI[]>>) => {
            state.notification.isLoading = false;
            state.notification.error = null;
            state.notification.data = action.payload.data;
        });
        builder.addCase(fetchNotification.pending, (state) => {
            state.notification.isLoading = true;
        });
        builder.addCase(fetchNotification.rejected, (state, action) => {
            state.notification.isLoading = false;
            state.notification.error = action.payload;
        });
    },
});

export default contentSlice.reducer;
