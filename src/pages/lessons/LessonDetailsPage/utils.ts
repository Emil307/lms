import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    nameLesson?: string;
    nameCourse?: string;
    groupId: string;
}

interface GetTabListProps {
    isTestExists?: boolean;
    isHomeworkExists?: boolean;
}

export const getBreadCrumbsItems = ({ nameLesson = "", nameCourse = "", groupId }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "Мои курсы", href: { pathname: "/my-courses" } },
    { title: nameCourse, href: { pathname: "/my-courses/[id]", query: { id: groupId } } },
    { title: nameLesson },
];

export const getTabList = ({ isTestExists, isHomeworkExists }: GetTabListProps) => {
    const tabsList = [
        { id: 1, label: "Содержание", value: "contents" },
        { id: 2, label: "Материалы", value: "materials" },
    ];

    if (isTestExists) {
        tabsList.push({ id: 3, label: "Тест", value: "test" });
    }

    if (isHomeworkExists) {
        tabsList.push({ id: 4, label: "Домашнее задание", value: "homework" });
    }

    return tabsList;
};
