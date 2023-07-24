import { z } from "zod";
import { $Role, $getPaginationResponseType } from "@shared/types";

export type GetRolesResponse = z.infer<typeof $GetRolesResponse>;

export const $GetRolesResponse = $getPaginationResponseType($Role);
