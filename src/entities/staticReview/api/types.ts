import { z } from "zod";
import { $uploadedFile } from "@shared/ui";
import { $pagination, TDefaultRequestParams } from "@shared/types";

export type AdminStaticReview = z.infer<typeof $adminStaticReview>;
export type AdminStaticReviewDetail = z.infer<typeof $adminStaticReviewDetail>;

export type GetAdminStaticReviewsResponse = z.infer<typeof $getAdminStaticReviewsResponse>;
export type CreateAdminStaticReviewRequest = z.infer<typeof $createAdminStaticReviewRequest>;
export type UpdateAdminStaticReviewRequest = z.infer<typeof $updateAdminStaticReviewRequest>;

export type GetAdminStaticReviewsRequest = TDefaultRequestParams;

export const $adminStaticReview = z.object({
    id: z.number(),
    avatarUrl: z.string().nullable(), //TODO:
    fullName: z.string(),
    position: z.string().nullable(),
    quote: z.string().nullable(),
    videoName: z.string(),
    isActive: z.boolean(),
});

export const $adminStaticReviewDetail = z.object({
    id: z.number(),
    isActive: z.boolean(),
    avatarUrl: z.string().nullable(), //TODO:
    videoUrl: z.string().nullable(), //TODO:
    previewUrl: z.string().nullable(), //TODO:
    authorIsActive: z.boolean(),
    firstName: z.string(),
    lastName: z.string(),
    position: z.string().nullable(),
    quote: z.string().nullable(),
    content: z.string(),
});

export const $getAdminStaticReviewsResponse = z.object({
    data: z.array($adminStaticReview),
    meta: z.object({
        pagination: $pagination,
    }),
});

export const $createAdminStaticReviewRequest = z
    .object({
        isActive: z.boolean(),
        videoId: z.number().optional(),
        previewId: z.number().optional(),
        content: z.string({ required_error: "Введите заголовок" }),
        authorIsActive: z.boolean(),
        authorAvatarId: z.number().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        position: z.string().optional(),
        quote: z.string().optional(),
        preview: $uploadedFile.nullable().refine((value) => value !== null, {
            message: "Выберите изображение",
        }),
        avatar: $uploadedFile.nullable(),
        video: $uploadedFile.nullable().refine((value) => value !== null, {
            message: "Выберите видео",
        }),
    })
    .refine(
        (data) => {
            if (!data.authorIsActive) {
                return true;
            }
            return !!data.firstName;
        },
        {
            message: "Введите имя",
            path: ["firstName"],
        }
    )
    .refine(
        (data) => {
            if (!data.authorIsActive) {
                return true;
            }
            return !!data.lastName;
        },
        {
            message: "Введите фамилию",
            path: ["lastName"],
        }
    );

export const $updateAdminStaticReviewRequest = z
    .object({
        isActive: z.boolean(),
        videoId: z.number().optional(),
        previewId: z.number().optional(),
        content: z.string({ required_error: "Введите заголовок" }),
        authorIsActive: z.boolean(),
        authorAvatarId: z.number().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        position: z.string().optional(),
        quote: z.string().optional(),
        preview: $uploadedFile.nullable().refine((value) => value !== null, {
            message: "Выберите изображение",
        }),
        avatar: $uploadedFile.nullable(),
        video: $uploadedFile.nullable().refine((value) => value !== null, {
            message: "Выберите видео",
        }),
    })
    .refine(
        (data) => {
            if (!data.authorIsActive) {
                return true;
            }
            return !!data.firstName;
        },
        {
            message: "Введите имя",
            path: ["firstName"],
        }
    )
    .refine(
        (data) => {
            if (!data.authorIsActive) {
                return true;
            }
            return !!data.lastName;
        },
        {
            message: "Введите фамилию",
            path: ["lastName"],
        }
    );
