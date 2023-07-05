import { z } from "zod";

export type UpdateTransactionFormValidation = z.infer<typeof $UpdateTransactionFormValidation>;

export const $UpdateTransactionFormValidation = z.object({
    entityType: z.string({ required_error: "Выберите вид сущности" }),
    entityId: z.string({ required_error: "Выберите сущность" }),
    amount: z
        .number({ required_error: "Укажите стоимость" })
        .positive("Число должно быть положительным")
        .int("Число должно быть целым")
        .nullable()
        .refine((value) => value !== null, {
            message: "Укажите стоимость",
        }),
    userId: z.string({ required_error: "Выберите пользователя" }),
    status: z.string({ required_error: "Выберите статус" }),
    paymentType: z.string({ required_error: "Выберите вид оплаты" }),
});
