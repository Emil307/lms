import { z } from "zod";

export const $invoicePaymentFormValidationSchema = z.object({
    name: z.string({ required_error: "Введите название" }),
    ogrn: z.string({ required_error: "Введите ОГРН" }),
    settlementAccount: z.string({ required_error: "Введите расчетный счет" }),
    inn: z.string({ required_error: "Введите ИНН" }),
    kpp: z.string({ required_error: "Введите КПП" }),
    legalAddress: z.string({ required_error: "Введите адрес" }),
    bank: z.string({ required_error: "Введите название банка" }),
});

export type InvoicePaymentFormValidationSchema = z.infer<typeof $invoicePaymentFormValidationSchema>;
