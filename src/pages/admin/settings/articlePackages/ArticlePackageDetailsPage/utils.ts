import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    name?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ name = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Пакеты базы знаний", href: { pathname: "/admin/settings/article-packages" } },
    { title: name, href: { pathname: "/admin/settings/article-packages/[id]", query: { id } } },
];
