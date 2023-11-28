import { z } from "zod";

export type InvoiceForPaymentFormValidationSchema = z.infer<typeof $InvoiceForPaymentFormValidationSchema>;

export const $InvoiceForPaymentFormValidationSchema = z.object({
    organizationName: z.string({ required_error: "Введите название организации" }),
    organizationOGRN: z.string({ required_error: "Введите ОГРН" }).length(18, "Должно быть 18 символов"),
    organizationPaymentAccount: z.coerce.string({ required_error: "Введите расчетный счет" }).length(20, "Должно быть 20 цифр"),
    organizationINN: z.coerce.string({ required_error: "Введите ИНН" }).min(10, "Не менее 10 цифр").max(12, "Не более 12 цифр"),
    organizationKPP: z.coerce.string({ required_error: "Введите КПП" }).min(13, "Не менее 13 цифр").max(15, "Не более 15 цифр"),
    organizationJuridicalAddress: z.string({ required_error: "Введите адрес" }),
    organizationBankName: z.string({ required_error: "Введите название банка" }),
});
