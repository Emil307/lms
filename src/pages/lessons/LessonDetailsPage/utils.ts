import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsItemsProps {
    nameLesson?: string;
    nameCourse?: string;
    courseId: string;
    lessonId: string;
}

export const getBreadCrumbsItems = ({
    nameLesson = "",
    // nameCourse = "",
    courseId,
    lessonId,
}: TGetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "Мои курсы", href: { pathname: "/my-courses" } },
    //TODO:  Добавить crumb на название курса
    // { title: nameCourse, href: { pathname: '' } },
    { title: nameLesson, href: { pathname: "/my-courses/[id]/lessons/[lessonId]", query: { id: courseId, lessonId } } },
];
