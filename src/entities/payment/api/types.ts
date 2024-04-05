import { z } from "zod";

export type PaymentAcquiring = z.infer<typeof $PaymentAcquiring>;
export type PaymentEntityType = z.infer<typeof $PaymentEntityType>;
export type PaymentService = z.infer<typeof $PaymentService>;

export type CreatePaymentAcquiringRequest = z.infer<typeof $CreatePaymentAcquiringRequest>;
export type CreatePaymentAcquiringResponse = z.infer<typeof $CreatePaymentAcquiringResponse>;
export type CreateInvoiceForPaymentRequest = z.infer<typeof $CreateInvoiceForPaymentRequest>;

export const $PaymentAcquiring = z.object({
    formUrl: z.string(),
    orderId: z.string(),
});

export const $PaymentEntityType = z.literal("course").or(z.literal("coursePackage")).or(z.literal("articlePackage"));
export const $PaymentService = z.literal("prodamus").or(z.literal("yookassa"));

export const $CreatePaymentAcquiringRequest = z.object({
    entityType: $PaymentEntityType,
    entityId: z.number(),
    service: $PaymentService,
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
