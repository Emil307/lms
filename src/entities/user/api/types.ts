import { z } from "zod";

export type TUser = {
    id: number;
    fullName: string;
    email: string;
    roleName: string;
    isActive: boolean;
};

const $usersResponse = z.object({
    data: z.array(
        z.object({
            email: z.string(),
            fullName: z.string(),
            id: z.number(),
            isActive: z.boolean(),
            roleName: z.string(),
        })
    ),
    meta: z.object({
        pagination: z.object({
            count: z.number(),
            current_page: z.number(),
            links: z.object({
                next: z.string().nullish(),
                previous: z.string().nullish(),
            }),
            per_page: z.number(),
            total: z.number(),
            total_pages: z.number(),
        }),
    }),
});

type UsersResponseType = z.infer<typeof $usersResponse>;

export { $usersResponse };

export type { UsersResponseType };