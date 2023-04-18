import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsProps {
    categoryName?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ categoryName = "", id }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Категории курсов", href: { pathname: "/admin/settings/categories" } },
    { title: categoryName, href: { pathname: "/admin/settings/categories/[id]", query: { id } } },
];
