import { TInfoCardDisplayFields } from "@components/InfoCard";
import { User } from "@entities/auth";
import { TBreadCrumbItem } from "@shared/ui";
import { getFullName } from "@shared/utils";

export const breadCrumbsItems: TBreadCrumbItem[] = [
    { title: "Мой профиль", href: { pathname: "/cabinet" } },
    { title: "Настройки профиля" },
];

export const fields: TInfoCardDisplayFields<User> = [
    {
        name: "profile.firstName",
        label: "ФИО",
        renderString: (_value, item) => getFullName({ data: item?.profile }),
    },
    { name: "roles.0.displayName", label: "Роль" },
    { name: "email", label: "Email" },
];
