import { Box } from "@mantine/core";
import { Paragraph } from "@shared/ui";
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
        description: "Заполните реквизиты и распечатай готовый счет на оплату.",
        value: "createInvoice",
    },
    {
        id: 3,
        title: "Оплата зарубежной картой",
        description: (
            <Box>
                <Paragraph variant="text-small-m" color="gray45.0">
                    Visa/Mastercard, USD.
                </Paragraph>
                <Paragraph variant="text-small-m" color="gray45.0">
                    Оплата счета в USD, дебетовые и кредитные карты.
                </Paragraph>
            </Box>
        ),
        value: "prodamus",
    },
];

export const initialValues: SelectPaymentTypeFormValidation = {
    paymentType: paymentTypeItems[0].value,
};
