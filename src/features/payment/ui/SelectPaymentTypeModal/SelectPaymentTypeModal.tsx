import { Box, Flex } from "@mantine/core";
import { useState } from "react";
import { closeAllModals, closeModal, openModal } from "@mantine/modals";
import { Button, ControlButtons, Paragraph } from "@shared/ui";
import { PaymentEntityType, useCreatePaymentAcquiring } from "@entities/payment";
import useStyles from "./SelectPaymentTypeModal.styles";
import InvoiceForPaymentModal from "./components/InvoiceForPaymentModal/InvoiceForPaymentModal";

export interface SelectPaymentTypeModalProps {
    entityType: PaymentEntityType;
    entityId: number;
    onClose: () => void;
}

const SelectPaymentTypeModal = ({ entityType, entityId, onClose }: SelectPaymentTypeModalProps) => {
    const { classes } = useStyles();
    const [isSubmittingAcquiring, setSubmittingAcquiring] = useState(false);

    const { mutate: createPaymentAcquiring } = useCreatePaymentAcquiring();

    const handleCloseCreateInvoiceForPaymentModal = () => closeModal("CREATE_INVOICE_FOR_PAYMENT");

    const handleSuccessCreateInvoiceForPayment = () => closeAllModals();

    const handleOpenCreateInvoiceForPaymentModal = () => {
        openModal({
            modalId: "CREATE_INVOICE_FOR_PAYMENT",
            title: "Счет на оплату",
            children: (
                <InvoiceForPaymentModal
                    entityType={entityType}
                    entityId={entityId}
                    onSuccess={handleSuccessCreateInvoiceForPayment}
                    onClose={handleCloseCreateInvoiceForPaymentModal}
                />
            ),
        });
    };

    const handleCreatePaymentAcquiring = () => {
        setSubmittingAcquiring(true);
        createPaymentAcquiring(
            { entityId, entityType },
            {
                onSuccess: ({ formUrl }) => {
                    const linkElement = document.createElement("a");
                    linkElement.href = formUrl;
                    linkElement.click();
                },
                onError: () => {
                    setSubmittingAcquiring(false);
                },
            }
        );
    };

    return (
        <Flex direction="column" gap={24}>
            <Flex direction="column" gap={24} align="center">
                <Button loading={isSubmittingAcquiring} onClick={handleCreatePaymentAcquiring}>
                    Перейти к оплате
                </Button>
                <Paragraph variant="large">Оплатить онлайн</Paragraph>
            </Flex>

            <Flex gap={24} align="center">
                <Box className={classes.divider}></Box>
                <Paragraph variant="small-m">или</Paragraph>
                <Box className={classes.divider}></Box>
            </Flex>

            <Flex direction="column" gap={4} align="center">
                <Paragraph variant="large">Сформируйте счет на оплату</Paragraph>
                <Paragraph variant="small-m" color="neutral_gray" align="center" px={24}>
                    Заполните реквизиты и распечатай готовый счет на оплату.
                </Paragraph>
            </Flex>

            <ControlButtons submitButtonText="Сформировать" onSubmit={handleOpenCreateInvoiceForPaymentModal} onClose={onClose} />
        </Flex>
    );
};

export default SelectPaymentTypeModal;
