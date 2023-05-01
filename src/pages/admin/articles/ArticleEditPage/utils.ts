import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    articleName?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ articleName = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "База знаний", href: { pathname: "/admin/articles" } },
    { title: articleName, href: { pathname: "/admin/articles/[id]/edit", query: { id } } },
];
