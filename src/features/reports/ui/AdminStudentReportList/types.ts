import { z } from "zod";

export type AdminStudentReportsFiltersFormValidation = z.infer<typeof $AdminStudentReportsFiltersFormValidation>;

export const $AdminStudentReportsFiltersFormValidation = z.object({
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
