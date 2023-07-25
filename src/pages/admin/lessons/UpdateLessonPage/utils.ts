import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    courseId?: string;
    courseName?: string;
    moduleId?: string;
    moduleName?: string;
    lessonId: string;
    lessonName: string;
}

export const getBreadCrumbsItems = ({
    courseId,
    courseName,
    moduleId,
    moduleName,
    lessonId,
    lessonName,
}: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => {
    if (!courseId || !moduleId || !courseName || !moduleName) {
        return [
            { title: "Уроки", href: { pathname: "/admin/lessons" } },
            { title: lessonName, href: { pathname: "/admin/lessons/[lessonId]", query: { lessonId } } },
        ];
    }
    return [
        { title: "Курсы", href: { pathname: "/admin/courses" } },
        { title: courseName, href: { pathname: "/admin/courses/[id]", query: { id: courseId } } },
        { title: moduleName, href: { pathname: "/admin/courses/[id]/modules/[moduleId]", query: { id: courseId, moduleId } } },
        {
            title: lessonName,
            href: { pathname: "/admin/courses/[id]/modules/[moduleId]/lessons/[lessonId]", query: { id: courseId, moduleId, lessonId } },
        },
    ];
};
