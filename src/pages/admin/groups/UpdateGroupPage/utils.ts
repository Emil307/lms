import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    groupName?: string;
    id: string;
}

export const getBreadCrumbsItems = ({ groupName = "", id }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Группы", href: { pathname: "/admin/groups" } },
    { title: groupName, href: { pathname: "/admin/groups/[id]/edit", query: { id } } },
];
