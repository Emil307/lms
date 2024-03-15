export interface TRouterQueries {
    page?: number;
    query?: string;
    hasDiscount?: string;
    tags?: string[];
    categoryId?: string;
    subcategoryIds?: string[];
    packageIds?: string[];
    isFavorite?: boolean;
    isPopular?: boolean;
    collectionIds?: string;
    discountPrice?: string;
}
