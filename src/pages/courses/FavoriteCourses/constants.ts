import { TBreadCrumbItem } from "@shared/ui";

export const breadCrumbsItems: TBreadCrumbItem[] = [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "Курсы", href: { pathname: "/courses" } },
    { title: "Избранные курсы", href: { pathname: "/courses/favorite" } },
];
