import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    courseId: string;
    courseName: string;
    moduleId: string;
    moduleName: string;
}

export const getBreadCrumbsItems = ({ courseId, courseName, moduleId, moduleName }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Курсы", href: { pathname: "/admin/courses" } },
    { title: courseName, href: { pathname: "/admin/courses/[id]", query: { id: courseId, tab: "modulesAndLessons" } } },
    { title: moduleName, href: { pathname: "/admin/courses/[id]/modules/[moduleId]", query: { id: courseId, moduleId: moduleId } } },
];
