import React from "react";
import { FormikHelpers } from "formik";
import { AlignLeft, Clipboard } from "react-feather";
import { Box, BoxProps, Flex, ThemeIcon } from "@mantine/core";
import { $UpdateContactsRequest, GetContactsResponse, UpdateContactsRequest, staticPageApi, useContacts } from "@entities/staticPage";
import { Button, FTextEditor, FTextarea, Heading, ManagedForm } from "@shared/ui";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { adaptDataForUpdateContactsForm } from "./utils";
import { initialValues } from "./constants";
import useStyles from "./UpdateContactsForm.styles";

export interface UpdateContactsFormProps extends BoxProps {}

const UpdateContactsForm = (props: UpdateContactsFormProps) => {
    const { classes } = useStyles();
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
                            <ThemeIcon color="gray45">
                                <Clipboard />
                            </ThemeIcon>
                            <Heading order={4}>Заголовок</Heading>
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
                            <ThemeIcon color="gray45">
                                <AlignLeft />
                            </ThemeIcon>
                            <Heading order={4}>Реквизиты</Heading>
                        </Flex>
                        <FTextEditor mt={24} name="contactPageRequisites" className={classes.textEditorRequisites} />
                        <Flex className={classes.actionsContainer}>
                            <Button variant="border" size="large" onClick={onCancel} className={classes.actionButton} disabled={!dirty}>
                                Отменить
                            </Button>
                            <Button variant="secondary" type="submit" size="large" className={classes.actionButton} disabled={!dirty}>
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
