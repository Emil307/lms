import { TBreadCrumbItem } from "@shared/ui";

export const breadCrumbsItems: TBreadCrumbItem[] = [
    { title: "Мой профиль", href: { pathname: "/cabinet" } },
    { title: "Мои курсы", href: { pathname: "/my-courses" } },
];

export const tabOrder = ["all", "inProgress", "notStarted", "completed", "archive"];
