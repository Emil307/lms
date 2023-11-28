import { InvoiceForPaymentFormValidationSchema } from "./types";

export const initialValues: InvoiceForPaymentFormValidationSchema = {
    organizationName: "",
    organizationOGRN: "",
    organizationPaymentAccount: "",
    organizationINN: "",
    organizationKPP: "",
    organizationJuridicalAddress: "",
    organizationBankName: "",
};
