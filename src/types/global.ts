export interface RoutesType {
    name?: string;
    component: () => JSX.Element;
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean;
}
