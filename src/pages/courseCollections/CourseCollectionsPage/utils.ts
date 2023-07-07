import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    title?: string;
}

export const getBreadCrumbsItems = ({ title = "" }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "Курсы", href: { pathname: "/courses" } },
    { title, href: { pathname: "/course-collections" } },
];
