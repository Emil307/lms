import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    name?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ name = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Группы", href: { pathname: "/admin/groups" } },
    { title: name, href: { pathname: "/admin/groups/[id]", query: { id } } },
];
