import { TInfoCardDisplayFields } from "@components/InfoCard";

interface ProfileUser {
    fio: string;
    roleName: string;
    email: string;
}

export const fields: TInfoCardDisplayFields<ProfileUser> = [
    { name: "fio", label: "Фио" },
    { name: "roleName", label: "Роль" },
    { name: "email", label: "Email" },
];
