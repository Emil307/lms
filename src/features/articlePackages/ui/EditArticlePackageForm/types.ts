import { z } from "zod";

export type UpdateArticlePackageFormValidation = z.infer<typeof $updateArticlePackageFormValidation>;

export const $updateArticlePackageFormValidation = z
    .object({
        name: z.string({ required_error: "Введите наименование" }),
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
        description: z.string({ required_error: "Введите описание" }),
        isActive: z.boolean(),
        discountIsActive: z.boolean(),
        discount: z.object({
            type: z.literal("percentage").or(z.literal("currency")),
            amount: z.number().positive("Число должно быть положительным").int("Число должно быть целым").nullable(),

            startingDate: z.string().datetime({ offset: true }).nullable().optional(),
            finishingDate: z.string().datetime({ offset: true }).nullable().optional(),
        }),
    })
    .refine(
        (data) => {
            if (!data.discountIsActive) {
                return true;
            }
            return !!data.discount?.amount;
        },
        {
            message: "Укажите размер скидки",
            path: ["discount.amount"],
        }
    )
    .refine(
        (data) => {
            if (!data.discountIsActive) {
                return true;
            }
            return !!data.discount?.startingDate;
        },
        {
            message: "Укажите период действия",
            path: ["discount.startingDate"],
        }
    )
    .refine(
        (data) => {
            if (!data.price || !data.discount?.amount || data.discount.type === "percentage") {
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
            if (!data.discount?.amount || data.discount.type === "currency") {
                return true;
            }
            return 100 >= data.discount.amount;
        },
        {
            message: "Размер скидки не может быть больше 100%",
            path: ["discount.amount"],
        }
    );

export interface TGetDiscountPrice {
    price: number | null;
    amountDiscount: number | null;
    type: "percentage" | "currency";
}
