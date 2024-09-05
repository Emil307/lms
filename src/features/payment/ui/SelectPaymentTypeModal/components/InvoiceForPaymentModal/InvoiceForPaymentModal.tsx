import { Flex } from "@mantine/core";
import { saveAs } from "file-saver";
import { ManagedForm, Paragraph } from "@shared/ui";
import { MutationKeys } from "@shared/constant";
import { paymentApi } from "@entities/payment";
import { ToastType, createNotification } from "@shared/utils";
import { TFileDownloadResponse } from "@app/config/axios/types";
import { isErrorsArray, isMessageError } from "@shared/guards";
import { $InvoiceForPaymentFormValidationSchema, InvoiceForPaymentFormValidationSchema } from "./types";
import { initialValues } from "./constants";
import { SelectPaymentTypeModalProps } from "../../SelectPaymentTypeModal";
import FBillForm from "./components/FBillForm";

export interface InvoiceForPaymentModalProps extends SelectPaymentTypeModalProps {
    onSuccess: () => void;
    setOpen?: boolean;
}

const InvoiceForPaymentModal = ({ entityType, entityId, onSuccess, onClose, setOpen }: InvoiceForPaymentModalProps) => {
    const createInvoiceForPayment = (values: InvoiceForPaymentFormValidationSchema) => {
        switch (entityType) {
            case "course":
                return paymentApi.createInvoiceForPaymentCourse({ ...values, entityId });
            case "articlePackage":
                return paymentApi.createInvoiceForPaymentArticlePackage({ ...values, entityId });
        }
    };

    const onSuccessForm = (response: TFileDownloadResponse) => {
        const href = URL.createObjectURL(response.data);
        saveAs(href, response.filename);
        createNotification({
            type: ToastType.SUCCESS,
            title: "Счет на оплату",
            message: "Счет успешно сформирован",
        });
        onSuccess();
    };

    const onError = (error: unknown) => {
        if (!isErrorsArray(error) && isMessageError(error)) {
            return createNotification({
                type: ToastType.WARN,
                title: "Ошибка создания счета",
                message: error.response?.data.message,
            });
        }
    };

    function renderHeader() {
        if (setOpen) {
            return null;
        }
        return (
            <Paragraph variant="small-m" color="gray45">
                Заполните необходимые поля для формирования счета на оплату.
            </Paragraph>
        );
    }

    return (
        <Flex direction="column" gap={24}>
            {renderHeader()}
            <ManagedForm<InvoiceForPaymentFormValidationSchema, TFileDownloadResponse>
                initialValues={initialValues}
                validationSchema={$InvoiceForPaymentFormValidationSchema}
                mutationKey={[MutationKeys.CREATE_INVOICE_FOR_PAYMENT]}
                mutationFunction={createInvoiceForPayment}
                disableOverlay
                onSuccess={onSuccessForm}
                onError={onError}>
                <FBillForm onClose={onClose} setOpen={setOpen} />
            </ManagedForm>
        </Flex>
    );
};

export default InvoiceForPaymentModal;
