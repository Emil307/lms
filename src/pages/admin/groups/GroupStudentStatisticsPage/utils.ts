import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    groupId: string;
    groupName: string;
    studentFullName: string;
}

export const getBreadCrumbsItems = ({ groupId, groupName, studentFullName }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Группы", href: { pathname: "/admin/groups" } },
    { title: groupName, href: { pathname: "/admin/groups/[id]", query: { id: groupId } } },
    { title: studentFullName },
];
