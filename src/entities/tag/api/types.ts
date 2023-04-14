import { z } from "zod";
import { MRT_SortingState } from "mantine-react-table";
import { $pagination } from "@shared/types";

export type AdminTag = z.infer<typeof $adminTag>;

export type GetAdminTagsResponse = z.infer<typeof $getAdminTagsResponse>;
export type UpdateAdminTagRequest = z.infer<typeof $updateAdminTagRequest>;
export type CreateAdminTagRequest = z.infer<typeof $createAdminTagRequest>;
export interface GetAdminTagsRequest {
    sorting?: MRT_SortingState;
    perPage: number;
    page: number;
    query?: string;
}

export const $adminTag = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.string().datetime(),
    //TODO: Статус нужно будет удалить как бекенд обновит схему
    isActive: z.boolean(),
});

export const $getAdminTagsResponse = z.object({
    data: z.array($adminTag),
    meta: z.object({
        pagination: $pagination,
    }),
});
export const $updateAdminTagRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
});

export const $createAdminTagRequest = z.object({
    name: z.string({ required_error: "Введите название" }),
});
