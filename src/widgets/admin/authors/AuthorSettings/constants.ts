import { TInfoCardDisplayFields } from "@components/InfoCard";

interface ProfileUser {
    fio: string;
}

export const fields: TInfoCardDisplayFields<ProfileUser> = [{ name: "fio", label: "Фио" }];
