import { Box, BoxProps, Flex, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { AlignLeft, Clipboard } from "react-feather";
import { FormikHelpers } from "formik";
import { Button, FFileInput, FInput, FTextEditor, FTextarea, ManagedForm } from "@shared/ui";
import { GetAboutResponse, staticPageApi, useAbout } from "@entities/staticPage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { $UpdateAboutValidation, UpdateAboutValidation } from "./types";
import { initialValues } from "./constants";
import { adaptDataForUpdateAboutForm } from "./utils";

export interface UpdateAboutFormProps extends BoxProps {}

const UpdateAboutForm = (props: UpdateAboutFormProps) => {
    const { data } = useAbout();

    const updateAboutPage = (values: UpdateAboutValidation) => {
        return staticPageApi.updateAbout({ ...values, aboutPageBannerImage: values.image?.id });
    };

    const onSuccess = (response: GetAboutResponse, { resetForm }: Omit<FormikHelpers<UpdateAboutValidation>, "setFieldError">) => {
        resetForm({ values: { ...initialValues, ...adaptDataForUpdateAboutForm(response) } });
    };

    return (
        <Box {...props}>
            <ManagedForm<UpdateAboutValidation, GetAboutResponse>
                initialValues={{ ...initialValues, ...adaptDataForUpdateAboutForm(data) }}
                validationSchema={$UpdateAboutValidation}
                mutationKey={[MutationKeys.UPDATE_ABOUT]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ABOUT] }]}
                mutationFunction={updateAboutPage}
                onSuccess={onSuccess}
                hasConfirmModal>
                {({ dirty, onCancel }) => (
                    <>
                        <FFileInput title="Загрузите файлы" name="image" type="image" withDeleteButton w="100%" maw={1256} h={420} />
                        <Flex gap={16} align="center" mt={24}>
                            <ThemeIcon size={24} color="gray45" variant="outline" sx={{ border: "none" }}>
                                <Clipboard />
                            </ThemeIcon>
                            <Title order={4} color="dark">
                                Заголовок и описание
                            </Title>
                        </Flex>
                        <FInput mt={24} label="Заголовок" size="sm" name="aboutPageTitle" maw={772} />
                        <FTextarea name="aboutPageShortContent" mt={8} autosize maw={772} />
                        <Flex gap={16} align="center" mt={32}>
                            <ThemeIcon size={24} color="gray45" variant="outline" sx={{ border: "none" }}>
                                <AlignLeft />
                            </ThemeIcon>
                            <Title order={4} color="dark">
                                Общая информация
                            </Title>
                        </Flex>
                        <FTextEditor mt={24} name="aboutPageFullContent" maw={1162} h={320} />
                        <Flex gap={8} mt={32}>
                            <Button variant="border" size="large" onClick={onCancel} disabled={!dirty} w="100%" maw={252}>
                                Отменить
                            </Button>
                            <Button variant="secondary" type="submit" size="large" disabled={!dirty} w="100%" maw={252}>
                                Сохранить
                            </Button>
                        </Flex>
                    </>
                )}
            </ManagedForm>
        </Box>
    );
};

export default UpdateAboutForm;
