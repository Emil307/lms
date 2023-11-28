import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type UpdateCoursePackageFormValidation = z.infer<typeof $UpdateCoursePackageFormValidation>;

export const $UpdateCoursePackageFormValidation = z
    .object({
        name: z.string({ required_error: "Введите наименование" }),
        price: z
            .string({ required_error: "Введите стоимость" })
            .nullable()
            .refine((value) => value !== null, {
                message: "Введите стоимость",
            }),
        description: z.string({ required_error: "Введите описание" }),
        isActive: z.boolean(),
        hasDiscount: z.boolean(),
        cover: $UploadedFile.nullable().optional(),
        discount: z.object({
            type: z.literal("percentage").or(z.literal("currency")),
            amount: z.string().nullable().optional(),
            startingDate: z.coerce.date({ required_error: "Выберите период" }).nullable(),
            finishingDate: z.coerce.date().nullable(),
        }),
    })
    .refine(
        (data) => {
            if (!data.hasDiscount) {
                return true;
            }
            return Number(data.discount.amount);
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
            return Number(data.price) >= Number(data.discount.amount);
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
            return 100 >= Number(data.discount.amount);
        },
        {
            message: "Размер скидки не может быть больше 100%",
            path: ["discount.amount"],
        }
    );
