import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    articleId: string;
    title: string;
}

export const getBreadCrumbsItems = ({ articleId, title }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "База знаний", href: { pathname: "/article-collection" } },
    { title: "Избранное", href: { pathname: "/article-collection/favorite" } },
    {
        title,
        href: { pathname: "/article-collection/favorite/[articleId]", query: { articleId } },
    },
];
