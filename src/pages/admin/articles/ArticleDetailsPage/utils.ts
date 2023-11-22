import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    articleName?: string;
}

export const getBreadCrumbsItems = ({ articleName = "" }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "База знаний", href: { pathname: "/admin/articles" } },
    { title: articleName },
];
