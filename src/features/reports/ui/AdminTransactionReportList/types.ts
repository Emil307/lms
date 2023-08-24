import { z } from "zod";

export type AdminTransactionReportsFiltersFormValidation = z.infer<typeof $AdminTransactionReportsFiltersFormValidation>;

export const $AdminTransactionReportsFiltersFormValidation = z.object({
    createdAtFrom: z.coerce
        .date({ required_error: "Выберите период" })
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите даты",
        }),
    createdAtTo: z.coerce
        .date()
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите даты",
        }),
});
