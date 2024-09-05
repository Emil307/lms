import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type UpdateMainBannerFormValidation = z.infer<typeof $UpdateMainBannerFormValidation>;

export const $UpdateMainBannerFormValidation = z.object({
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
});
