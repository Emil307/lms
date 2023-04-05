import { z } from "zod";
import { $pagination } from "@shared/types";

const $role = z.object({
    id: z.number(),
    name: z.string(),
    displayName: z.string(),
});

export const $rolesResponse = z.object({
    data: z.array($role),
    meta: z.object({
        pagination: $pagination,
    }),
});

type RolesResponseType = z.infer<typeof $rolesResponse>;

export type { RolesResponseType };
