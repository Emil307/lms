import { TBreadCrumbItem } from "@shared/ui";

export const tabsList = [
    { id: 1, label: "Все", value: "all" },
    { id: 2, label: "Мои курсы", value: "my-courses" },
    { id: 3, label: "Избранное", value: "favorite" },
];

export const breadCrumbsItems: TBreadCrumbItem[] = [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "База знаний", href: { pathname: "/article-collection" } },
    { title: "Избранное", href: { pathname: "/article-collection/favorite" } },
];
