import { z } from "zod";
import { $UploadedFile, $getPaginationResponseType, TDefaultRequestParams } from "@shared/types";

export type AdminStaticReview = z.infer<typeof $adminStaticReview>;

export type GetAdminStaticReviewsResponse = z.infer<typeof $getAdminStaticReviewsResponse>;
export type CreateAdminStaticReviewRequest = z.infer<typeof $createAdminStaticReviewRequest>;
export type UpdateAdminStaticReviewRequest = z.infer<typeof $updateAdminStaticReviewRequest>;
export type UpdateActivityStaticReviewRequest = z.infer<typeof $updateActivityStaticReviewRequest>;
export type UpdateActivityStaticReviewResponse = z.infer<typeof $updateActivityStaticReviewResponse>;

export type GetAdminStaticReviewsRequest = TDefaultRequestParams;

export const $adminStaticReview = z.object({
    id: z.number(),
    authorAvatar: $UploadedFile.nullable(),
    authorIsActive: z.boolean(),
    content: z.string(),
    firstName: z.string().nullish(),
    lastName: z.string().nullish(),
    position: z.string().nullable(),
    isActive: z.boolean(),
    preview: $UploadedFile.nullable(), //TODO:
    quote: z.string().nullable(),
    video: $UploadedFile.nullable(), //TODO:
});

export const $getAdminStaticReviewsResponse = $getPaginationResponseType($adminStaticReview);

export const $createAdminStaticReviewRequest = z
    .object({
        isActive: z.boolean(),
        videoId: z.number().optional(),
        previewId: z.number().optional(),
        content: z.string({ required_error: "Введите заголовок" }),
        authorIsActive: z.boolean(),
        authorAvatarId: z.number().optional(),
        firstName: z.string().nullish(),
        lastName: z.string().nullish(),
        position: z.string().optional(),
        quote: z.string().optional(),
        preview: $UploadedFile.nullable().refine((value) => value !== null, {
            message: "Выберите изображение",
        }),
        avatar: $UploadedFile.nullable(),
        video: $UploadedFile.nullable().refine((value) => value !== null, {
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

export const $updateAdminStaticReviewRequest = $createAdminStaticReviewRequest;

export const $updateActivityStaticReviewRequest = z.object({
    id: z.number(),
    isActive: z.boolean(),
});

export const $updateActivityStaticReviewResponse = z.object({
    isActive: z.boolean(),
});
