import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    title: string;
}

export const getBreadCrumbsItems = ({ title = "" }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "База знаний", href: { pathname: "/articles" } },

    { title: "Избранное", href: { pathname: "/articles", query: { tab: "favorite" } } },
    {
        title,
    },
];
