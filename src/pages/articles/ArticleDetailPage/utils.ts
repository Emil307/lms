import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    articleId: string;
    title: string;
}

export const getBreadCrumbsItems = ({ articleId, title }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "База знаний", href: { pathname: "/articles" } },
    { title: "Избранное", href: { pathname: "/articles/favorite" } },
    {
        title,
        href: { pathname: "/articles/favorite/[articleId]", query: { articleId } },
    },
];
