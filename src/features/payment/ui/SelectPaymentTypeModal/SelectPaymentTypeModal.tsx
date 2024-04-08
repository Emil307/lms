import { Flex } from "@mantine/core";
import { useState } from "react";
import { closeAllModals, closeModal, openModal } from "@mantine/modals";
import { FormikConfig } from "formik";
import { ControlButtons, FRadioGroup, Form, Radio } from "@shared/ui";
import { PaymentEntityType, PaymentService, useCreatePaymentAcquiring } from "@entities/payment";
import { $SelectPaymentTypeFormValidation, SelectPaymentTypeFormValidation } from "./types";
import { initialValues, paymentTypeItems } from "./constants";
import { InvoiceForPaymentModal } from "./components";
import useStyles from "./SelectPaymentTypeModal.styles";

export interface SelectPaymentTypeModalProps {
    entityType: PaymentEntityType;
    entityId: number;
    onClose: () => void;
}

const SelectPaymentTypeModal = ({ entityType, entityId, onClose }: SelectPaymentTypeModalProps) => {
    const { classes } = useStyles();

    const [isSubmitting, setSubmitting] = useState(false);

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

    const handleCreatePaymentAcquiring = (service: PaymentService) => {
        setSubmitting(true);
        createPaymentAcquiring(
            { entityId, entityType, service },
            {
                onSuccess: ({ formUrl }) => {
                    const linkElement = document.createElement("a");
                    linkElement.href = formUrl;
                    linkElement.click();
                },
                onError: () => {
                    setSubmitting(false);
                },
            }
        );
    };

    const config: FormikConfig<SelectPaymentTypeFormValidation> = {
        initialValues: initialValues,
        validationSchema: $SelectPaymentTypeFormValidation,
        onSubmit: (values) => {
            switch (values.paymentType) {
                case "yookassa":
                    return handleCreatePaymentAcquiring("yookassa");
                case "prodamus":
                    return handleCreatePaymentAcquiring("prodamus");

                default:
                    return handleOpenCreateInvoiceForPaymentModal();
            }
        },
    };

    return (
        <Form config={config} disableOverlay>
            <Flex direction="column" gap={24}>
                <FRadioGroup name="paymentType">
                    <Flex className={classes.paymentTypesContainer}>
                        {paymentTypeItems.map((item) => (
                            <Radio
                                size="md"
                                labelPosition="left"
                                key={item.id}
                                label={item.title}
                                value={item.value}
                                description={item.description}
                                className={classes.paymentTypeItem}
                            />
                        ))}
                    </Flex>
                </FRadioGroup>
                <ControlButtons variant="modal" submitButtonText="Продолжить" disabledSubmit={isSubmitting} onClose={onClose} />
            </Flex>
        </Form>
    );
};

export default SelectPaymentTypeModal;
