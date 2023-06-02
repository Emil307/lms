import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    courseId: number;
    courseName: string;
}

export const getBreadCrumbsItems = ({ courseId, courseName }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Курсы", href: { pathname: "/admin/courses" } },
    { title: courseName, href: { pathname: "/admin/courses/[id]", query: { id: String(courseId) } } },
];
