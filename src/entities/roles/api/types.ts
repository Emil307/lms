import { z } from "zod";
import { $paginationResponse } from "@shared/types";

const $role = z.object({
    id: z.number(),
    name: z.string(),
    display_name: z.string(),
});

export const $rolesResponse = z.object({
    data: z.array($role),
    meta: $paginationResponse,
});

type RolesResponseType = z.infer<typeof $rolesResponse>;

export type { RolesResponseType };
