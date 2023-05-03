import { TBreadCrumbItem } from "@shared/ui/BreadCrumbs";

//TODO: После добавления страниц поменять урлы
export const breadCrumbsItems: TBreadCrumbItem[] = [
    { title: "Мой профиль", href: { pathname: "/" } },
    { title: "Настройки профиля", href: { pathname: "/profile" } },
    { title: "Редактирование данных", href: { pathname: "/profile/edit" } },
];
