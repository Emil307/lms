import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    courseId: string;
    courseName: string;
    studentId: string;
    studentFullName: string;
}

export const getBreadCrumbsItems = ({ courseId, courseName, studentId, studentFullName }: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Ученики", href: { pathname: "/admin/students" } },
    { title: studentFullName, href: { pathname: "/admin/students/[id]", query: { id: studentId } } },
    { title: courseName, href: { pathname: "/admin/courses/[id]", query: { id: courseId } } },
];
