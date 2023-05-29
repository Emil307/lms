import { z } from "zod";
import { $UploadedFile, $getPaginationResponseType, TDefaultRequestParams } from "@shared/types";

export type AdminStaticReview = z.infer<typeof $AdminStaticReview>;

export type GetAdminStaticReviewsResponse = z.infer<typeof $GetAdminStaticReviewsResponse>;
export type CreateAdminStaticReviewRequest = z.infer<typeof $CreateAdminStaticReviewRequest>;
export type UpdateAdminStaticReviewRequest = z.infer<typeof $UpdateAdminStaticReviewRequest>;
export type UpdateStaticReviewActivityRequest = z.infer<typeof $UpdateStaticReviewActivityRequest>;
export type UpdateStaticReviewActivityResponse = z.infer<typeof $UpdateStaticReviewActivityResponse>;

export type GetAdminStaticReviewsRequest = TDefaultRequestParams;

export const $AdminStaticReview = z.object({
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

export const $GetAdminStaticReviewsResponse = $getPaginationResponseType($AdminStaticReview);

export const $CreateAdminStaticReviewRequest = z
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

export const $UpdateAdminStaticReviewRequest = $CreateAdminStaticReviewRequest;

export const $UpdateStaticReviewActivityRequest = z.object({
    id: z.number(),
    isActive: z.boolean(),
});

export const $UpdateStaticReviewActivityResponse = z.object({
    isActive: z.boolean(),
});
