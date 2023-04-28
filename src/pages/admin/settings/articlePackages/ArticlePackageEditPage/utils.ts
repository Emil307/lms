import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    id: string;
    packageName?: string;
}

export const getBreadCrumbsItems = ({ packageName = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Пакеты курсов", href: { pathname: "/admin/settings/article-packages" } },
    { title: packageName, href: { pathname: "/admin/settings/article-packages/[id]/edit", query: { id } } },
];
