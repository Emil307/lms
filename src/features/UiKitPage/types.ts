import { z } from "zod";

export const $DateTime = z.coerce.date();

export type TUser = {
    id: number;
    fio: string;
    role: string;
    email: string;
    status: string;
};
