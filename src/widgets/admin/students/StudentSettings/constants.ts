import { ProfileInfoDisplayFields } from "@components/ProfileInfo";

interface ProfileUser {
    fio: string;
    roleName: string;
    email: string;
}

export const fields: ProfileInfoDisplayFields<ProfileUser> = [
    { name: "fio", label: "Фио" },
    { name: "roleName", label: "Роль" },
    { name: "email", label: "Email" },
];
