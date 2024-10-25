import React from "react";
import { FormikHelpers } from "formik";
import { AlignLeft, Clipboard } from "react-feather";
import { Box, BoxProps, Flex, ThemeIcon } from "@mantine/core";
import { $UpdateContactsRequest, GetContactsResponse, UpdateContactsRequest, staticPageApi, useContacts } from "@entities/staticPage";
import { FControlButtons, FTextEditor, FTextarea, Heading, ManagedForm } from "@shared/ui";
import { EntityNames, MutationKeys } from "@shared/constant";
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
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.STATIC_CONTACT }}
                mutationFunction={updateContactsPage}
                onSuccess={onSuccess}
                disabledLoadingOnSuccess>
                {({ onCancel }) => (
                    <>
                        <Flex gap={16} align="center">
                            <ThemeIcon color="neutralMain50">
                                <Clipboard />
                            </ThemeIcon>
                            <Heading order={4}>Адрес</Heading>
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
                            <ThemeIcon color="neutralMain50">
                                <AlignLeft />
                            </ThemeIcon>
                            <Heading order={4}>Реквизиты</Heading>
                        </Flex>
                        <FTextEditor mt={24} name="contactPageRequisites" className={classes.textEditorRequisites} />
                        <FControlButtons onClose={onCancel} mt={32} />
                    </>
                )}
            </ManagedForm>
        </Box>
    );
};

export default UpdateContactsForm;
