import { z } from "zod";

export type TUser = {
    id: number;
    fullName: string;
    email: string;
    role: string[];
    isActive: boolean;
};

const $usersResponse = z.object({
    data: z.array(
        z.object({
            email: z.string(),
            fullName: z.string(),
            id: z.number(),
            isActive: z.boolean(),
            isStatic: z.boolean(),
            role: z.array(z.string()),
        })
    ),
    meta: z.object({
        pagination: z.object({
            count: z.number(),
            current_page: z.number(),
            links: z.object({
                next: z.string(),
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
