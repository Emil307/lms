import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    groupId: string;
    groupName: string;
    studentId: string;
    studentFullName: string;
}

export const getBreadCrumbsItems = ({ groupId, groupName, studentId, studentFullName }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Ученики", href: { pathname: "/admin/students" } },
    { title: studentFullName, href: { pathname: "/admin/students/[id]", query: { id: studentId } } },
    { title: groupName, href: { pathname: "/admin/groups/[id]", query: { id: groupId } } },
];
