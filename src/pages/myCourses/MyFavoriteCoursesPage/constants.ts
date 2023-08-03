import { TBreadCrumbItem } from "@shared/ui";

export const breadCrumbsItems: TBreadCrumbItem[] = [
    { title: "Мой профиль", href: { pathname: "/" } },
    { title: "Мои курсы", href: { pathname: "/my-courses" } },
    { title: "Избранные курсы", href: { pathname: "/my-courses/favorite" } },
];