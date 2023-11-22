import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    courseId: string;
    courseName: string;
    moduleName: string;
}

export const getBreadCrumbsItems = ({ courseId, courseName, moduleName }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Курсы", href: { pathname: "/admin/courses" } },
    { title: courseName, href: { pathname: "/admin/courses/[id]", query: { id: courseId, tab: "modulesAndLessons" } } },
    { title: moduleName },
];
