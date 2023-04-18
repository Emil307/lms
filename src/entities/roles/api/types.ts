import { z } from "zod";
import { $getPaginationResponseType, $role } from "@shared/types";

export const $rolesResponse = $getPaginationResponseType($role);

type RolesResponseType = z.infer<typeof $rolesResponse>;

export type { RolesResponseType };
