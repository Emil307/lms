import { ReactNode } from "react";
import { ArticleAndArticleCategoryFiltersForm } from "@entities/article";

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
    categoryTitle?: string;
    tab?: string;
    filterParams?: ArticleAndArticleCategoryFiltersForm;
}
