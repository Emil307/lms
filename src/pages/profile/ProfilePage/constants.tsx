import { ProfileInfoDisplayFields } from "@components/ProfileInfo";
import { User } from "@entities/auth";
import { TBreadCrumbItem } from "@shared/ui";

export const breadCrumbsItems: TBreadCrumbItem[] = [
    //TODO: изменить урл моего профиля
    { title: "Мой профиль", href: { pathname: "/" } },
    { title: "Настройки профиля", href: { pathname: "/profile" } },
];

export const fields: ProfileInfoDisplayFields<User> = [
    {
        name: "profile.firstName",
        label: "ФИО",
        renderString: (_value, item) => `${item?.profile.lastName} ${item?.profile.firstName} ${item?.profile.patronymic}`,
    },
    { name: "roles.0.displayName", label: "Роль" },
    { name: "email", label: "Email" },
    //TODO: Добавить время последнего изменения пароля
];
