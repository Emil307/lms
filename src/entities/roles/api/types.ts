import { z } from "zod";
import { $pagination, $role } from "@shared/types";

export const $rolesResponse = z.object({
    data: z.array($role),
    meta: z.object({
        pagination: $pagination,
    }),
});

type RolesResponseType = z.infer<typeof $rolesResponse>;

export type { RolesResponseType };
