import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    packageName?: string;
}

export const getBreadCrumbsItems = ({ packageName = "" }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Пакеты курсов", href: { pathname: "/admin/settings/course-packages" } },
    { title: packageName },
];
