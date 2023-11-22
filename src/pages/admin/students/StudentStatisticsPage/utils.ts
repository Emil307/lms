import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    courseName: string;
    studentId: string;
    studentFullName: string;
}

export const getBreadCrumbsItems = ({ courseName, studentId, studentFullName }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Ученики", href: { pathname: "/admin/students" } },
    { title: studentFullName, href: { pathname: "/admin/students/[id]", query: { id: studentId } } },
    { title: courseName },
];
