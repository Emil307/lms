import { PaymentType, SelectPaymentTypeFormValidation } from "./types";

export const paymentTypeItems: PaymentType[] = [
    {
        id: 1,
        title: "Оплата онлайн",
        description: "Быстрая оплата по СБП, банковской картой или ЮMoney.",
        value: "yookassa",
    },
    {
        id: 2,
        title: "Оплата по расчетному счёту",
        value: "createInvoice",
    },
    {
        id: 3,
        title: "Оплата зарубежной картой",
        value: "prodamus",
    },
];

export const initialValues: SelectPaymentTypeFormValidation = {
    paymentType: paymentTypeItems[0].value,
};
