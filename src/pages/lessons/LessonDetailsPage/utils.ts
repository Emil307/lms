import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    nameLesson?: string;
    nameCourse?: string;
    groupId: string;
    lessonId: string;
}

interface GetTabListProps {
    hasTest?: boolean;
    hasHomework?: boolean;
}

export const getBreadCrumbsItems = ({
    nameLesson = "",
    nameCourse = "",
    groupId,
    lessonId,
}: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "Мои курсы", href: { pathname: "/my-courses" } },
    { title: nameCourse, href: { pathname: "/my-courses/[id]", query: { id: groupId } } },
    { title: nameLesson, href: { pathname: "/my-courses/[id]/lessons/[lessonId]", query: { id: groupId, lessonId } } },
];

export const getTabList = ({ hasHomework, hasTest }: GetTabListProps) => {
    const tabsList = [
        { id: 1, label: "Содержание", value: "contents" },
        { id: 2, label: "Материалы", value: "materials" },
    ];

    if (hasTest) {
        tabsList.push({ id: 3, label: "Тест", value: "test" });
    }

    if (hasHomework) {
        tabsList.push({ id: 4, label: "Домашнее задание", value: "homework" });
    }

    return tabsList;
};
