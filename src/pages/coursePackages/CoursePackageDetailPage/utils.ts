import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    name?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ name = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: name, href: { pathname: "/course-packages/[id]", query: { id } } },
];
