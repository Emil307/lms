import { TBreadCrumbItem } from "@shared/ui";

interface TGetBreadCrumbsProps {
    userName: string;
    id: string;
}

export const getBreadCrumbsItems = ({ userName = "", id }: TGetBreadCrumbsProps): TBreadCrumbItem[] => [
    { title: "Ученики", href: { pathname: "/admin/students" } },
    { title: userName, href: { pathname: "/admin/students/[id]", query: { id } } },
];

interface GetTabListProps {
    isTeacher: boolean;
}

export const getTabList = ({ isTeacher }: GetTabListProps) => {
    const tabs = [
        { id: 1, label: "Настройки", value: "settings" },
        { id: 2, label: "Курсы", value: "courses" },
        { id: 3, label: "Группы", value: "groups" },
    ];

    if (!isTeacher) {
        tabs.push({ id: 4, label: "Пакеты базы знаний", value: "article-packages" });
    }

    return tabs;
};
