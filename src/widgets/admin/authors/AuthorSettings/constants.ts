import { ProfileInfoDisplayFields } from "@components/ProfileInfo";

interface ProfileUser {
    fio: string;
}

export const fields: ProfileInfoDisplayFields<ProfileUser> = [{ name: "fio", label: "Фио" }];
