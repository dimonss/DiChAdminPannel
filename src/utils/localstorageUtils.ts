import {rootReducer} from 'store/store';
// import {RootState} from 'types/globalTypes'; //todo finished it


export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify({
            ...state,
            errors: undefined,
            loading: undefined,
        });
        localStorage.setItem('dich_admin', serializedState);
    } catch (err: any) {
        new Error(err);
    }
};

export const loadState = (): ReturnType<typeof rootReducer> | undefined => {
    try {
        const serializedState = localStorage.getItem('dich_admin');
        if (serializedState === null) {
            return undefined;
        }
        // const state: RootState = JSON.parse(serializedState);
        // if (state.app?.stateVersion === undefined || config.stateVersion !== state.app.stateVersion) {
        //     return undefined;
        // } //todo finished it
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

// export const getRefreshToken = (): string => {
//     const state: RootState | undefined = loadState();
//     return state?.user.refreshToken || '';
// }; //todo finished it
