import { z } from "zod";
import { ReactNode } from "react";
import { $PaymentService } from "@entities/payment";

export type PaymentTypeValue = z.infer<typeof $PaymentTypeValue>;
export type SelectPaymentTypeFormValidation = z.infer<typeof $SelectPaymentTypeFormValidation>;

export const $PaymentTypeValue = $PaymentService.or(z.literal("createInvoice"));

export const $SelectPaymentTypeFormValidation = z.object({
    paymentType: $PaymentTypeValue,
});

export interface PaymentType {
    id: number;
    title: string;
    description: ReactNode;
    value: PaymentTypeValue;
}
