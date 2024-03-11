// import { rootReducer } from 'store/store';

export interface RoutesType {
    name: string;
    // component: () => JSX.Element;
    component: any; //TODO fix it
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean;
}

export type NullableString = string | null;
export type NullableNumber = number | null;

// export type RootState = ReturnType<typeof rootReducer>; //todo finished it

export interface ErrorI {
    status: NullableString;
    error: NullableString;
}
