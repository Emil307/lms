import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    coursePackageName?: string;
}

export const getBreadCrumbsItems = ({ coursePackageName = "" }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Пакеты курсов", href: { pathname: "/admin/settings/course-packages" } },
    { title: coursePackageName },
];
