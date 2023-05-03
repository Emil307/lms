import { ProfileInfoDisplayFields } from "@components/ProfileInfo";
import { User } from "@entities/auth";
import { TBreadCrumbItem } from "@shared/ui";

export const breadCrumbsItems: TBreadCrumbItem[] = [
    { title: "Мой профиль", href: { pathname: "/" } },
    { title: "Настройки профиля", href: { pathname: "/profile" } },
];

export const fields: ProfileInfoDisplayFields<User> = [
    { name: "profile.data.firstName", label: "Имя" },
    { name: "role.data.name", label: "Роль" },
    { name: "email", label: "Email" },
];
