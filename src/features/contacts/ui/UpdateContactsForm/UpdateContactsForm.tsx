import React from "react";
import { FormikHelpers } from "formik";
import { AlignLeft, Clipboard } from "react-feather";
import { Box, BoxProps, Flex, ThemeIcon, Title } from "@mantine/core";
import { $UpdateContactsRequest, GetContactsResponse, UpdateContactsRequest, staticPageApi, useContacts } from "@entities/staticPage";
import { Button, FTextEditor, FTextarea, ManagedForm } from "@shared/ui";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { adaptDataForUpdateContactsForm } from "./utils";
import { initialValues } from "./constants";

export interface UpdateContactsFormProps extends BoxProps {}

const UpdateContactsForm = (props: UpdateContactsFormProps) => {
    const { data } = useContacts();

    const updateContactsPage = (values: UpdateContactsRequest) => {
        return staticPageApi.updateContacts(values);
    };

    const onSuccess = (response: GetContactsResponse, { resetForm }: Omit<FormikHelpers<UpdateContactsRequest>, "setFieldError">) => {
        resetForm({ values: { ...initialValues, ...adaptDataForUpdateContactsForm(response) } });
    };

    return (
        <Box {...props}>
            <ManagedForm<UpdateContactsRequest, GetContactsResponse>
                initialValues={{ ...initialValues, ...adaptDataForUpdateContactsForm(data) }}
                validationSchema={$UpdateContactsRequest}
                mutationKey={[MutationKeys.UPDATE_CONTACTS]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_CONTACTS] }]}
                mutationFunction={updateContactsPage}
                onSuccess={onSuccess}
                hasConfirmModal>
                {({ dirty, onCancel }) => (
                    <>
                        <Flex gap={16} align="center">
                            <ThemeIcon size={24} color="gray45" variant="outline" sx={{ border: "none" }}>
                                <Clipboard />
                            </ThemeIcon>
                            <Title order={4} color="dark">
                                Заголовок
                            </Title>
                        </Flex>
                        <FTextarea
                            name="contactPageTitle"
                            mt={24}
                            autosize
                            w="100%"
                            maw={772}
                            sx={{
                                textarea: {
                                    minHeight: 190,
                                },
                            }}
                        />
                        <Flex gap={16} align="center" mt={32}>
                            <ThemeIcon size={24} color="gray45" variant="outline" sx={{ border: "none" }}>
                                <AlignLeft />
                            </ThemeIcon>
                            <Title order={4} color="dark">
                                Реквизиты
                            </Title>
                        </Flex>
                        <FTextEditor mt={24} name="contactPageRequisites" maw={1162} h={320} />
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

export default UpdateContactsForm;
