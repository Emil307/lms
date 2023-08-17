import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    name?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ name = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Мой профиль", href: { pathname: "/cabinet" } },
    { title: "Мои курсы", href: { pathname: "/my-courses" } },
    { title: name, href: { pathname: "/my-courses/[id]", query: { id } } },
];
