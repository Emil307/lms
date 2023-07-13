import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type UpdateMainBannerFormValidation = z.infer<typeof $UpdateMainBannerFormValidation>;

export const $UpdateMainBannerFormValidation = z
    .object({
        indexBannerFile: $UploadedFile
            .nullable()
            .optional()
            .refine((value) => value, {
                message: "Выберите изображение",
            }),
        indexBannerTitle: z.string({ required_error: "Введите заголовок" }),
        indexBannerSubTitle: z.string({ required_error: "Введите подзаголовок" }),
        indexBannerButtonText: z.string({ required_error: "Введите название кнопки" }),
        indexBannerButtonLink: z.string({ required_error: "Укажите ссылку" }),
        indexBannerAuthorActive: z.boolean(),
        indexBannerAuthorAvatar: $UploadedFile.nullable().optional(),
        indexBannerAuthorFirstName: z.string().optional(),
        indexBannerAuthorLastName: z.string().optional(),
        indexBannerAuthorAbout: z.string().optional(),
        indexBannerAuthorShortQuote: z.string().optional(),
    })
    .refine(
        (data) => {
            if (!data.indexBannerAuthorActive) {
                return true;
            }
            return !!data.indexBannerAuthorFirstName;
        },
        {
            message: "Введите имя",
            path: ["indexBannerAuthorFirstName"],
        }
    )
    .refine(
        (data) => {
            if (!data.indexBannerAuthorActive) {
                return true;
            }
            return !!data.indexBannerAuthorLastName;
        },
        {
            message: "Введите фамилию",
            path: ["indexBannerAuthorLastName"],
        }
    );
