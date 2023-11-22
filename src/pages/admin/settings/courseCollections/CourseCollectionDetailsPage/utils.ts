import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    name?: string;
}

export const getBreadCrumbsItems = ({ name = "" }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Подборки курсов", href: { pathname: "/admin/settings/course-collections" } },
    { title: name },
];
