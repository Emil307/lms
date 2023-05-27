import { z } from "zod";
import { $Role, $getPaginationResponseType } from "@shared/types";

export type GetRolesResponse = z.infer<typeof $GetRolesResponse>;

export const $GetRolesResponse = $getPaginationResponseType($Role);

export enum Roles {
    "administrator" = 1,
    "manager" = 2,
    "teacher" = 3,
    "student" = 4,
    "employee" = 5,
}
