import dayjs from "dayjs";
import { TBreadCrumbItem } from "@shared/ui";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { GetTitleProps, PageTitle, TGetBreadCrumbsItemsProps, TRouterQueries } from "./types";
import { initialBreadCrumbsItems, tabsList, titleList } from "./constants";

export const getBreadCrumbsItems = ({ category, tab, filterParams }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => {
    if (!tab || tab !== "all") {
        const tabInfo = tabsList.find((item) => item.value === tab);

        return [
            ...initialBreadCrumbsItems,
            {
                title: tabInfo?.label || "",
                href: { pathname: "/articles", query: { ...filterParams, tab } },
            },
        ];
    }

    if (category?.id) {
        return [
            ...initialBreadCrumbsItems,
            {
                title: category.name,
                href: { pathname: "/articles", query: { ...filterParams, tab } },
            },
        ];
    }

    return initialBreadCrumbsItems;
};

export const getTitle = ({ categoryId, tab, categoryName = "" }: GetTitleProps): PageTitle => {
    if (categoryId) {
        return { ...titleList[0], label: categoryName };
    }
    return titleList.find((item) => item.value === tab) || titleList[0];
};

export const prepareQueryParams = (values: ArticleAndArticleCategoryFiltersForm) => {
    const params = {} as Record<string, any>;

    Object.keys(values).forEach((key) => {
        const value = values[key as keyof ArticleAndArticleCategoryFiltersForm];

        if (value instanceof Date) {
            params[key] = dayjs(value).format("YYYY-MM-DD");
            return;
        }
        params[key] = value;
    });

    return params;
};

export const adaptArticleCategoriesFiltersForm = (queryParams: TRouterQueries): Partial<ArticleAndArticleCategoryFiltersForm> => {
    const { tags = [], subcategoryIds = [], ...rest } = queryParams;

    return {
        ...rest,
        tags: Array.isArray(tags) ? tags : [tags],
        subcategoryIds: Array.isArray(subcategoryIds) ? subcategoryIds : [subcategoryIds],
    };
};
