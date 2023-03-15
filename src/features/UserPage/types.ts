import { z } from "zod";

export const $DateTime = z.coerce.date();

export type TUser = {
    id: number;
    fullName: string;
    email: string;
    role: string[];
    isActive: boolean;
};

export interface IUser {
    data: TUser[]
}
