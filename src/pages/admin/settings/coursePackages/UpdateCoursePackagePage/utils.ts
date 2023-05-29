import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    coursePackageName?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ coursePackageName = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Пакеты курсов", href: { pathname: "/admin/settings/course-packages" } },
    { title: coursePackageName, href: { pathname: "/admin/settings/course-packages/[id]/edit", query: { id } } },
];
