import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    id: string;
    name?: string;
}

export const getBreadCrumbsItems = ({ name = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Пакеты базы знаний", href: { pathname: "/admin/settings/article-packages" } },
    { title: name, href: { pathname: "/admin/settings/article-packages/[id]/edit", query: { id } } },
];
