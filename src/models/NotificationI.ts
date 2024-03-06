import { NullableString } from 'types/globalTypes';

export interface NotificationI {
    id: number;
    isNew: boolean;
    title: NullableString;
    description: NullableString;
    img: NullableString;
}
