import { Flex } from "@mantine/core";
import { saveAs } from "file-saver";
import { ChevronLeft } from "react-feather";
import { FControlButtons, FInput, ManagedForm, Paragraph } from "@shared/ui";
import { MutationKeys } from "@shared/constant";
import { paymentApi } from "@entities/payment";
import { ToastType, createNotification } from "@shared/utils";
import { TFileDownloadResponse } from "@app/config/axios/types";
import { $InvoiceForPaymentFormValidationSchema, InvoiceForPaymentFormValidationSchema } from "./types";
import { initialValues } from "./constants";
import { SelectPaymentTypeModalProps } from "../../SelectPaymentTypeModal";

export interface InvoiceForPaymentModalProps extends SelectPaymentTypeModalProps {
    onSuccess: () => void;
}

const InvoiceForPaymentModal = ({ entityType, entityId, onSuccess, onClose }: InvoiceForPaymentModalProps) => {
    const createInvoiceForPayment = (values: InvoiceForPaymentFormValidationSchema) => {
        switch (entityType) {
            case "course":
                return paymentApi.createInvoiceForPaymentCourse({ ...values, entityId });
            case "course_package":
                return paymentApi.createInvoiceForPaymentCoursePackage({ ...values, entityId });
            case "article_package":
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

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания счета",
        });
    };

    return (
        <Flex direction="column" gap={24}>
            <Paragraph variant="small-m" color="gray45">
                Заполните необходимые поля для формирования счета на оплату.
            </Paragraph>
            <ManagedForm<InvoiceForPaymentFormValidationSchema, TFileDownloadResponse>
                initialValues={initialValues}
                validationSchema={$InvoiceForPaymentFormValidationSchema}
                mutationKey={[MutationKeys.CREATE_INVOICE_FOR_PAYMENT]}
                mutationFunction={createInvoiceForPayment}
                disableOverlay
                onSuccess={onSuccessForm}
                onError={onError}>
                <Flex direction="column" gap={24}>
                    <Flex direction="column" gap={8}>
                        <FInput name="organizationName" label="Название организации" />
                        <FInput name="organizationOGRN" label="ОГРН" />
                        <FInput name="organizationPaymentAccount" label="Расчетный счет" type="number" />
                        <FInput name="organizationINN" label="ИНН" type="number" />
                        <FInput name="organizationKPP" label="КПП" type="number" />
                        <FInput name="organizationJuridicalAddress" label="Юридический адрес" />
                        <FInput name="organizationBankName" label="Банк" />
                    </Flex>
                    <FControlButtons
                        variant="modal"
                        cancelButtonText="Назад"
                        submitButtonText="Скачать"
                        onClose={onClose}
                        cancelButtonProps={{
                            leftIcon: <ChevronLeft />,
                        }}
                    />
                </Flex>
            </ManagedForm>
        </Flex>
    );
};

export default InvoiceForPaymentModal;