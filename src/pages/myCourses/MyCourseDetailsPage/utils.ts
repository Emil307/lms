import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    name?: string;
}

export const getBreadCrumbsItems = ({ name = "" }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Мой профиль", href: { pathname: "/cabinet" } },
    { title: "Мои курсы", href: { pathname: "/my-courses" } },
    { title: name },
];
