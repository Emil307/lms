import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type UpdateAdminStaticReviewFormValidation = z.infer<typeof $UpdateAdminStaticReviewFormValidation>;

export const $UpdateAdminStaticReviewFormValidation = z
    .object({
        isActive: z.boolean(),
        content: z.string({ required_error: "Введите заголовок" }),
        authorIsActive: z.boolean(),
        firstName: z.string().nullish(),
        lastName: z.string().nullish(),
        position: z.string().optional(),
        quote: z.string().max(150, "Должно быть не более 150 символов").optional(),
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
    )
    .refine(
        (data) => {
            if (!data.authorIsActive) {
                return true;
            }
            return !!data.position;
        },
        {
            message: "Укажите информацию об авторе",
            path: ["position"],
        }
    )
    .refine(
        (data) => {
            if (!data.authorIsActive) {
                return true;
            }
            return !!data.quote;
        },
        {
            message: "Введите краткую цитату",
            path: ["quote"],
        }
    )
    .refine(
        (data) => {
            if (!data.authorIsActive || !data.firstName) {
                return true;
            }
            return data.firstName.length <= 32;
        },
        {
            message: "Должно быть не более 32 символов",
            path: ["firstName"],
        }
    )
    .refine(
        (data) => {
            if (!data.authorIsActive || !data.lastName) {
                return true;
            }
            return data.lastName.length <= 32;
        },
        {
            message: "Должно быть не более 32 символов",
            path: ["lastName"],
        }
    );
