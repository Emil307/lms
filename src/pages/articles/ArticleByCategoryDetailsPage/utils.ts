import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    title: string;
    categoryName?: string;
    categoryId?: string;
}

export const getBreadCrumbsItems = ({
    title = "",
    categoryName = "Без категории",

    categoryId,
}: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "База знаний", href: { pathname: "/articles" } },
    { title: categoryName, href: { pathname: "/articles", query: { tab: "all", categoryId } } },
    {
        title,
    },
];
