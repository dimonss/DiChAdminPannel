import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthI {
    username: string;
    password: string;
}

export interface UserReduxI {
    auth: AuthI;
    loggedIn: boolean;
}

const initialState: UserReduxI = {
    auth: { username: '', password: '' },
    loggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        auth(state, action: PayloadAction<AuthI>) {
            state.auth = action.payload;
            state.loggedIn = true;
        },
        logout(state) {
            state.loggedIn = false;
        },
        userSetInitialState: () => initialState,
    },
});

export default userSlice.reducer;
