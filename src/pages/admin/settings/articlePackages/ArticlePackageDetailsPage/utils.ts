import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    name?: string;
}

export const getBreadCrumbsItems = ({ name = "" }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Пакеты базы знаний", href: { pathname: "/admin/settings/article-packages" } },
    { title: name },
];
