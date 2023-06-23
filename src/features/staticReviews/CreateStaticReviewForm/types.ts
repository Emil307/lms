import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type CreateAdminStaticReviewFormValidation = z.infer<typeof $CreateAdminStaticReviewFormValidation>;

export const $CreateAdminStaticReviewFormValidation = z
    .object({
        isActive: z.boolean(),
        content: z.string({ required_error: "Введите заголовок" }),
        authorIsActive: z.boolean(),
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
