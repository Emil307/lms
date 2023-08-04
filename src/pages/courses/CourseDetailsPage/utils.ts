import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    courseName?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ courseName = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "Курсы", href: { pathname: "/courses" } },
    { title: courseName, href: { pathname: "/courses/[id]", query: { id } } },
];
