import { z } from "zod";

export type UpdateTransactionFormValidation = z.infer<typeof $UpdateTransactionFormValidation>;

export const $UpdateTransactionFormValidation = z.object({
    entityType: z.string({ required_error: "Выберите вид сущности" }),
    entityId: z.string({ required_error: "Выберите сущность" }),
    amount: z.string({ required_error: "Укажите стоимость" }).refine((value) => Number(value) > 0, {
        message: "Число должно быть положительным",
    }),
    userId: z.string({ required_error: "Выберите пользователя" }),
    status: z.string({ required_error: "Выберите статус" }),
    paymentType: z.string({ required_error: "Выберите вид оплаты" }),
});
