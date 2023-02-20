import { z } from "zod";

export const $DateTime = z.coerce.date()

export type TUser = {
    name: string;
    description: string;
    email: string;
    password: string;
};
