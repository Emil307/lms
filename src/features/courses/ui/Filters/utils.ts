import dayjs from "dayjs";
import { CoursesFiltersForm } from "@entities/course";
import { TRouterQueries } from "./types";

export const getInitialValues = (discountPrice?: number): CoursesFiltersForm => ({
    query: "",
    hasDiscount: false,
    tags: [],
    categoryId: "",
    subcategoryIds: [],
    isFavorite: false,
    collectionIds: "",
    packageIds: [],
    discountPrice: discountPrice || 0,
});

export const prepareQueryParams = (values: CoursesFiltersForm) => {
    const params = {} as Record<string, any>;

    Object.keys(values).forEach((key) => {
        const value = values[key as keyof CoursesFiltersForm];

        if (value instanceof Date) {
            params[key] = dayjs(value).format("YYYY-MM-DD");
            return;
        }
        params[key] = value;
    });

    return params;
};

export const adaptCourseFiltersForm = (queryParams: TRouterQueries): Partial<CoursesFiltersForm> => {
    const { tags = [], subcategoryIds = [], hasDiscount, packageIds = [], isFavorite, discountPrice, ...rest } = queryParams;

    return {
        ...rest,
        tags: Array.isArray(tags) ? tags : [tags],
        subcategoryIds: Array.isArray(subcategoryIds) ? subcategoryIds : [subcategoryIds],
        packageIds: Array.isArray(packageIds) ? packageIds : [packageIds],
        ...(discountPrice && { discountPrice: Number(discountPrice) }),
        hasDiscount: hasDiscount === "true",
    };
};