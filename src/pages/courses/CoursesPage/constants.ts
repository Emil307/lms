import { CoursesFiltersForm } from "@entities/course";
import { TBreadCrumbItem } from "@shared/ui";

export const breadCrumbsItems: TBreadCrumbItem[] = [{ title: "Главная страница", href: { pathname: "/" } }, { title: "Курсы" }];

export const initialCourseFilters: CoursesFiltersForm = {
    query: "",
    hasDiscount: false,
    tags: [],
    categoryIds: [],
    subcategoryIds: [],
    collectionIds: "",
    discountPrice: [],
};
