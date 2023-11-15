import { Box, Flex, Text } from "@mantine/core";
import { FormikConfig } from "formik";
import { ChevronLeft } from "react-feather";
import { FControlButtons, FInput, Form } from "@shared/ui";
import { $invoicePaymentFormValidationSchema, InvoicePaymentFormValidationSchema } from "@features/coursePackages";

export interface InvoicePaymentFormProps {
    onClose: () => void;
}

const InvoicePaymentForm = ({ onClose }: InvoicePaymentFormProps) => {
    const config: FormikConfig<InvoicePaymentFormValidationSchema> = {
        initialValues: {
            name: "",
            ogrn: "",
            settlementAccount: "",
            inn: "",
            kpp: "",
            legalAddress: "",
            bank: "",
        },
        validationSchema: $invoicePaymentFormValidationSchema,
        onSubmit: () => {
            return;
        },
    };

    return (
        <Flex direction="column" gap={24}>
            <Text sx={(theme) => ({ fontWeight: 500, fontSize: 16, lineHeight: "24px", color: theme.colors.gray45[0] })}>
                Заполните необходимые поля для формирования счета на оплату.
            </Text>
            <Form config={config} disableOverlay>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        marginBottom: 24,
                    }}>
                    <FInput name="name" label="Название организации" />
                    <FInput name="ogrn" label="ОГРН" />
                    <FInput name="settlementAccount" label="Расчетный счет" />
                    <FInput name="inn" label="ИНН" />
                    <FInput name="kpp" label="КПП" />
                    <FInput name="legalAddress" label="Юридический адрес" />
                    <FInput name="bank" label="Банк" />
                </Box>
                <FControlButtons
                    variant="modal"
                    cancelButtonText="Назад"
                    submitButtonText="Скачать"
                    onClose={onClose}
                    cancelButtonProps={{
                        leftIcon: <ChevronLeft />,
                    }}
                />
            </Form>
        </Flex>
    );
};

export default InvoicePaymentForm;
