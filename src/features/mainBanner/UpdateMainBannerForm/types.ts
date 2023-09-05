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
        indexBannerTitle: z.string({ required_error: "Введите заголовок" }).max(70, "Должно быть не более 70 символов"),
        indexBannerSubTitle: z.string({ required_error: "Введите подзаголовок" }).max(70, "Должно быть не более 70 символов"),
        indexBannerButtonText: z.string({ required_error: "Введите название кнопки" }).max(20, "Должно быть не более 20 символов"),
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
    )
    .refine(
        (data) => {
            if (!data.indexBannerAuthorActive) {
                return true;
            }
            return !!data.indexBannerAuthorAvatar;
        },
        {
            message: "Выберите аватарку",
            path: ["indexBannerAuthorAvatar"],
        }
    )
    .refine(
        (data) => {
            if (!data.indexBannerAuthorActive || !data.indexBannerAuthorFirstName) {
                return true;
            }
            return data.indexBannerAuthorFirstName.length <= 20;
        },
        {
            message: "Должно быть не более 20 символов",
            path: ["indexBannerAuthorFirstName"],
        }
    )
    .refine(
        (data) => {
            if (!data.indexBannerAuthorActive || !data.indexBannerAuthorLastName) {
                return true;
            }
            return data.indexBannerAuthorLastName.length <= 20;
        },
        {
            message: "Должно быть не более 20 символов",
            path: ["indexBannerAuthorLastName"],
        }
    )
    .refine(
        (data) => {
            if (!data.indexBannerAuthorActive || !data.indexBannerAuthorAbout) {
                return true;
            }
            return data.indexBannerAuthorAbout.length <= 70;
        },
        {
            message: "Должно быть не более 70 символов",
            path: ["indexBannerAuthorAbout"],
        }
    )
    .refine(
        (data) => {
            if (!data.indexBannerAuthorActive || !data.indexBannerAuthorShortQuote) {
                return true;
            }
            return data.indexBannerAuthorShortQuote.length <= 150;
        },
        {
            message: "Должно быть не более 150 символов",
            path: ["indexBannerAuthorShortQuote"],
        }
    );
