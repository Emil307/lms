import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    groupName?: string;
}

export const getBreadCrumbsItems = ({ groupName = "" }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Группы", href: { pathname: "/admin/groups" } },
    { title: groupName },
];
