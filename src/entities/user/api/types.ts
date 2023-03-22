import { z } from "zod";
import { $paginationResponse } from "@shared/types";

const $user = z.object({
    email: z.string(),
    fullName: z.string(),
    id: z.number(),
    isActive: z.boolean(),
    roleName: z.string(),
});

const $usersResponse = z.object({
    data: z.array($user),
    meta: $paginationResponse,
});

type UsersResponseType = z.infer<typeof $usersResponse>;
type TUser = z.infer<typeof $user>;

export { $usersResponse };

export type { UsersResponseType, TUser };
