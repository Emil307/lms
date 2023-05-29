import { z } from "zod";

export type CreateArticlePackageFormValidation = z.infer<typeof $createArticlePackageFormValidation>;

export const $createArticlePackageFormValidation = z
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
        discount: z
            .object({
                discountIsActive: z.boolean(),
                type: z.literal("percentage").or(z.literal("currency")),
                amount: z.number().positive("Число должно быть положительным").int("Число должно быть целым").nullable().optional(),
                startingDate: z.string({ required_error: "Выберите период" }).datetime({ offset: true }).optional(),
                finishingDate: z.string().datetime({ offset: true }).optional(),
            })

            .refine(
                (data) => {
                    if (!data.discountIsActive) {
                        return true;
                    }
                    return data.amount !== null;
                },
                {
                    message: "Введите размер скидки",
                    path: ["amount"],
                }
            )
            .refine(
                (data) => {
                    if (!data.discountIsActive) {
                        return true;
                    }
                    return !!data.startingDate;
                },
                {
                    message: "Укажите период действия",
                    path: ["startingDate"],
                }
            ),
    })
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
