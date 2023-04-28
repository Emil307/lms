import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    packageName?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ packageName = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Пакеты базы знаний", href: { pathname: "/admin/settings/article-packages" } },
    { title: packageName, href: { pathname: "/admin/settings/article-packages/[id]", query: { id } } },
];
