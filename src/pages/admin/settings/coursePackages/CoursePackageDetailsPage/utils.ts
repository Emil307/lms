import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    packageName?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ packageName = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Пакеты курсов", href: { pathname: "/admin/settings/course-packages" } },
    { title: packageName, href: { pathname: "/admin/settings/course-packages/[id]", query: { id } } },
];
