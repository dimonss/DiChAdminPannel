import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface UserReduxI {
    token: string;
    loggedIn: boolean;
}

const initialState: UserReduxI = {
    token: '',
    loggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        auth(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.loggedIn = true;
        },
        logout(state) {
            state.loggedIn = false;
        },
        userSetInitialState: () => initialState,
    },
});

export default userSlice.reducer;
