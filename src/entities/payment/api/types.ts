import { z } from "zod";

export type PaymentAcquiring = z.infer<typeof $PaymentAcquiring>;
export type PaymentEntityType = z.infer<typeof $PaymentEntityType>;

export type CreatePaymentAcquiringRequest = z.infer<typeof $CreatePaymentAcquiringRequest>;
export type CreatePaymentAcquiringResponse = z.infer<typeof $CreatePaymentAcquiringResponse>;
export type CreateInvoiceForPaymentRequest = z.infer<typeof $CreateInvoiceForPaymentRequest>;

export const $PaymentAcquiring = z.object({
    formUrl: z.string(),
    orderId: z.string(),
});

export const $PaymentEntityType = z.literal("course").or(z.literal("course_package")).or(z.literal("article_package"));

export const $CreatePaymentAcquiringRequest = z.object({
    entityType: $PaymentEntityType,
    entityId: z.number(),
});

export const $CreatePaymentAcquiringResponse = $PaymentAcquiring;

export const $CreateInvoiceForPaymentRequest = z.object({
    entityId: z.number(),
    organizationName: z.string(),
    organizationOGRN: z.string(),
    organizationBankName: z.string(),
    organizationINN: z.string(),
    organizationKPP: z.string(),
    organizationPaymentAccount: z.string(),
    organizationJuridicalAddress: z.string(),
});
