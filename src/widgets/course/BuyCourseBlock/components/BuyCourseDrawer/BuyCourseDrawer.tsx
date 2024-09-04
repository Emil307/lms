import { Divider, Drawer, Flex, Group } from "@mantine/core";
import React, { SetStateAction } from "react";
import Image from "next/image";
import { FormikConfig } from "formik";
import { Button, Form, Heading, Paragraph } from "@shared/ui";
import { handleNextStep, handleSend } from "@widgets/course/BuyCourseBlock/utils";
import { CourseDetails } from "@entities/course";
import { useMedia } from "@shared/utils";
import testQr from "@public/test-qr-code.png";
import { $CreateInvoiceForPaymentRequest, CreateInvoiceForPaymentRequest } from "@entities/payment";
import FInput from "@shared/ui/Forms/Input/FInput";
import { initialValues } from "./constants";
import useStyles from "./BuyCourseDrawer.styles";

const BuyCourseDrawer = (
    opened: boolean,
    setOpened: React.Dispatch<SetStateAction<boolean>>,
    setStep: React.Dispatch<SetStateAction<number>>,
    step: number,
    data: CourseDetails
) => {
    const config: FormikConfig<CreateInvoiceForPaymentRequest> = {
        initialValues: { ...initialValues },
        validationSchema: $CreateInvoiceForPaymentRequest,
        enableReinitialize: true,
        onSubmit: () => {
            handleSend(setOpened, setStep);
        },
    };
    const { classes } = useStyles();
    const isTablet = useMedia("sm");

    const renderContent = () => {
        if (step === 1) {
            return (
                <Flex direction="column" align="center">
                    <Image src={testQr} alt="qr-code" />
                    <Group position="center" mt={24} spacing={4}>
                        <Paragraph variant="large">Платите с помощью QR</Paragraph>
                        <Paragraph variant="small-m" ta="center" color="gray45">
                            Отсканируй QR код, чтобы оплатить
                        </Paragraph>
                    </Group>

                    <Flex w="100%" my={34} gap={24} align="center">
                        <Divider sx={{ flex: 1 }} />
                        <Paragraph variant="small-m" ta="center">
                            или
                        </Paragraph>
                        <Divider sx={{ flex: 1 }} />
                    </Flex>

                    <Group position="center">
                        <Paragraph variant="large">Сформируйте счет на оплату</Paragraph>
                        <Paragraph variant="small-m" ta="center" color="gray45">
                            Заполните реквизиты и распечатай готовый счет на оплату.
                        </Paragraph>

                        <Button
                            mt={24}
                            onClick={() => {
                                handleNextStep(setStep);
                            }}>
                            Сформировать
                        </Button>
                    </Group>
                </Flex>
            );
        } else if (step === 2) {
            return (
                <>
                    <Paragraph variant="small-m" color="gray45" mt={4}>
                        Заполните реквизиты и распечатай готовый счет на оплату.
                    </Paragraph>
                    <Form config={config} disableOverlay>
                        <Flex direction="column" gap={8} my={24}>
                            <FInput name="organizationName" label="Название организации" type="string" size="sm" w="100%" />
                            <FInput name="organizationOGRN" label="ОГРН" type="number" size="sm" w="100%" />
                            <FInput name="organizationPaymentAccount" label="Расчетный счет" type="number" size="sm" w="100%" />
                            <FInput name="organizationINN" label="ИНН" type="number" size="sm" w="100%" />
                            <FInput name="organizationKPP" label="КПП" type="number" size="sm" w="100%" />
                            <FInput name="organizationJuridicalAddress" label="Юридический адрес" type="string" size="sm" w="100%" />
                            <FInput name="organizationBankName" label="Банк" type="string" size="sm" w="100%" />
                        </Flex>
                    </Form>
                    <Group position="left" mt="md">
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleSend(setOpened, setStep);
                            }}>
                            Скачать
                        </Button>
                    </Group>
                </>
            );
        }
    };

    return (
        <Drawer
            opened={opened}
            onClose={() => (setOpened(false), setStep(1))}
            title={<Heading order={3}>{step === 1 ? `Получить доступ к курсу «${data.name}»` : "Счет на оплату"}</Heading>}
            padding={24}
            size={isTablet ? "100%" : "450px"}
            position="right"
            classNames={classes}>
            {renderContent()}
        </Drawer>
    );
};

export default BuyCourseDrawer;
