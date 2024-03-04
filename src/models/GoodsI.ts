import { NullableNumber, NullableString } from 'types/globalTypes';

export interface GoodsI {
    id: number;
    categoryId: NullableNumber;
    title: NullableString;
    subtitle: NullableString;
    description: NullableString;
    price: NullableNumber;
    sellingPrice: NullableNumber;
    img: NullableString;
    rating: NullableNumber;
    ratingNumberOfVotes: NullableNumber;
    tags: NullableString;
    amount: number;
    displayInShop: number;
}
