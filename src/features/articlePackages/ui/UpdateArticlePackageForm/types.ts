import { z } from "zod";
import { $DiscountType } from "@shared/types";

export type UpdateArticlePackageFormValidation = z.infer<typeof $UpdateArticlePackageFormValidation>;

export const $UpdateArticlePackageFormValidation = z
    .object({
        name: z.string({ required_error: "Введите наименование" }).max(128, "Не более 128 символов"),
        categories: z.string().array().min(1, "Выберите категории"),
        tags: z.string().array().min(1, "Выберите теги"),
        price: z
            .number({ required_error: "Введите стоимость" })
            .positive("Число должно быть положительным")
            .int("Число должно быть целым")
            .nullable()
            .refine((value) => value !== null, {
                message: "Введите стоимость",
            }),
        description: z.string({ required_error: "Введите описание" }).max(1024, "Не более 1024 символов"),
        isActive: z.boolean(),
        hasDiscount: z.boolean(),
        discount: z.object({
            type: $DiscountType,
            amount: z.number().positive("Число должно быть положительным").int("Число должно быть целым").nullable().optional(),
            startingDate: z.coerce.date({ required_error: "Выберите период" }).nullable(),
            finishingDate: z.coerce.date().nullable(),
        }),
    })
    .refine(
        (data) => {
            if (!data.hasDiscount) {
                return true;
            }
            return data.discount.amount !== null;
        },
        {
            message: "Введите размер скидки",
            path: ["discount.amount"],
        }
    )
    .refine(
        (data) => {
            if (!data.hasDiscount) {
                return true;
            }
            return !!data.discount.startingDate;
        },
        {
            message: "Укажите период действия",
            path: ["discount.startingDate"],
        }
    )
    .refine(
        (data) => {
            if (!data.price || !data.discount.amount || data.discount.type === "percentage") {
                return true;
            }
            return data.price >= data.discount.amount;
        },
        {
            message: "Размер скидки не может быть меньше стоимости",
            path: ["discount.amount"],
        }
    )
    .refine(
        (data) => {
            if (!data.discount.amount || data.discount.type === "currency") {
                return true;
            }
            return 100 >= data.discount.amount;
        },
        {
            message: "Размер скидки не может быть больше 100%",
            path: ["discount.amount"],
        }
    );
