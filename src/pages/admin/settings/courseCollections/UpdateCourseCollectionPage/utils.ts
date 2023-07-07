import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    id: string;
    name?: string;
}

export const getBreadCrumbsItems = ({ name = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Подборки курсов", href: { pathname: "/admin/settings/course-collections" } },
    { title: name, href: { pathname: "/admin/settings/course-collections/[id]/edit", query: { id } } },
];
