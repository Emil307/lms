import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    categoryId: string;
    title: string;
}

export const getBreadCrumbsItems = ({ categoryId, title }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "База знаний", href: { pathname: "/article-collection" } },
    { title, href: { pathname: "/article-collection/[categoryId]", query: { categoryId } } },
];
