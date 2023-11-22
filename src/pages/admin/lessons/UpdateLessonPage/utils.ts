import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    courseId?: string;
    courseName?: string;
    moduleId?: string;
    moduleName?: string;
    lessonName: string;
}

export const getBreadCrumbsItems = ({
    courseId,
    courseName,
    moduleId,
    moduleName,
    lessonName,
}: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => {
    if (!courseId || !moduleId || !courseName || !moduleName) {
        return [{ title: "Уроки", href: { pathname: "/admin/lessons" } }, { title: lessonName }];
    }
    return [
        { title: "Курсы", href: { pathname: "/admin/courses" } },
        { title: courseName, href: { pathname: "/admin/courses/[id]", query: { id: courseId } } },
        { title: moduleName, href: { pathname: "/admin/courses/[id]/modules/[moduleId]", query: { id: courseId, moduleId } } },
        {
            title: lessonName,
        },
    ];
};
