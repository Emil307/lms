import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsProps {
    categoryName?: string;
}

export const getBreadCrumbsItems = ({ categoryName = "" }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Категории курсов", href: { pathname: "/admin/settings/categories" } },
    { title: categoryName },
];
