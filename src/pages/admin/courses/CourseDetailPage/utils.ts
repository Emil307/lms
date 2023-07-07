import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    courseId: number;
    courseName: string;
}

export const getBreadCrumbsItems = ({ courseId, courseName }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Курсы", href: { pathname: "/admin/courses" } },
    { title: courseName, href: { pathname: "/admin/courses/[id]", query: { id: String(courseId) } } },
];

interface GetTabListProps {
    isInteractive: boolean;
    isPublished: boolean;
}

export const getTabList = ({ isInteractive }: GetTabListProps) => {
    const tabs = [
        { id: 1, label: "Настройки", value: "settings" },
        { id: 2, label: "Модули и уроки", value: "modulesAndLessons" },
    ];

    if (!isInteractive) {
        tabs.push({ id: 3, label: "Группы", value: "groups" });
    }

    //TODO Вомзожно нужно будет добавить еще условия на отображение табов
    tabs.push({ id: 4, label: "Статистика", value: "statistics" });
    tabs.push({ id: 5, label: "Отзывы", value: "reviews" });

    return tabs;
};
