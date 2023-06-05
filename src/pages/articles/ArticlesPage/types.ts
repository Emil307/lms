import { ReactNode } from "react";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";
import { GetCategoryResponse } from "@entities/category";

export interface TRouterQueries {
    tab?: string;
    categoryId?: string;
    query?: string;
    tags?: string[];
    subcategoryIds?: string[];
}

export interface PageTitle {
    id: number;
    label: string;
    value: string;
    icon: ReactNode;
}

export interface GetTitleProps extends TRouterQueries {
    categoryName?: string;
}

export interface TGetBreadCrumbsItemsProps {
    category?: GetCategoryResponse;
    tab?: string;
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}
