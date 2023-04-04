import { z } from "zod";
import { MRT_SortingState } from "mantine-react-table";
import { $pagination } from "@shared/types";

const $user = z.object({
    email: z.string(),
    fullName: z.string(),
    id: z.number(),
    isActive: z.boolean(),
    roleName: z.string(),
});

const $usersResponse = z.object({
    data: z.array($user),
    meta: z.object({ pagination: $pagination }),
});

const $userDetailResponse = z.object({
    description: z.string(),
    email: z.string(),
    firstName: z.string(),
    id: z.number(),
    isActive: z.boolean(),
    isStatic: z.boolean(),
    lastName: z.string(),
    loginIn: z.string(),
    notifications: z.array(z.string()).optional(),
    patronymic: z.string(),
    roleId: z.number(),
    roleName: z.string(),
    updatedAt: z.string(),
});

interface UsersRequestParamsType {
    sorting?: MRT_SortingState;
    perPage: number;
    page: number;
    query?: string;
    filters?: {
        isActive?: "0" | "1";
    };
}

type UserDetailResponseType = z.infer<typeof $userDetailResponse>;

type UsersResponseType = z.infer<typeof $usersResponse>;
type TUser = z.infer<typeof $user>;

export { $usersResponse, $userDetailResponse };

export type { UsersResponseType, TUser, UserDetailResponseType, UsersRequestParamsType };
