import { TBreadCrumbItem } from "@shared/ui";

interface GetBreadCrumbsItemsProps {
    courseName: string;
}

export const getBreadCrumbsItems = ({ courseName }: GetBreadCrumbsItemsProps): TBreadCrumbItem[] => [
    { title: "Курсы", href: { pathname: "/admin/courses" } },
    { title: courseName },
];

interface GetTabListProps {
    isInteractive: boolean;
    isPublished: boolean;
    isTeacher: boolean;
}

export const getTabList = ({ isInteractive, isTeacher }: GetTabListProps) => {
    const tabs = [
        { id: 1, label: "Настройки", value: "settings" },
        { id: 2, label: "Модули и уроки", value: "modulesAndLessons" },
    ];

    if (!isInteractive) {
        tabs.push({ id: 3, label: "Группы", value: "groups" });
    }

    //TODO Вомзожно нужно будет добавить еще условия на отображение табов
    tabs.push({ id: 4, label: "Статьи", value: "articles" });

    if (!isTeacher) {
        tabs.push({ id: 5, label: "Отзывы", value: "reviews" });
    }

    return tabs;
};
