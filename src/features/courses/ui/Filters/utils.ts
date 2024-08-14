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
    discountPrice: discountPrice ?? 0,
});

export const prepareQueryParams = (values: CoursesFiltersForm): Record<string, any> => {
    return Object.keys(values).reduce((params, key) => {
        const value = values[key as keyof CoursesFiltersForm];

        if (value instanceof Date) {
            params[key] = dayjs(value).format("YYYY-MM-DD");
        } else {
            params[key] = value;
        }

        return params;
    }, {} as Record<string, any>);
};

export const adaptCourseFiltersForm = (queryParams: TRouterQueries): Partial<CoursesFiltersForm> => {
    const { tags = [], subcategoryIds = [], hasDiscount, packageIds = [], isFavorite, discountPrice, ...rest } = queryParams;

    return {
        ...rest,
        tags: Array.isArray(tags) ? tags : [tags],
        subcategoryIds: Array.isArray(subcategoryIds) ? subcategoryIds : [subcategoryIds],
        packageIds: Array.isArray(packageIds) ? packageIds : [packageIds],
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        hasDiscount: hasDiscount === "true",
    };
};

export const getCountAppliedQueries = (data: TRouterQueries, initialValues: CoursesFiltersForm): number => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        if (key === "page" || key === "categoryId" || initialValues[key as keyof TRouterQueries]?.toString() === value) {
            return acc;
        }

        const count = Array.isArray(value) ? value.length : 1;
        return acc + count;
    }, 0);
};
