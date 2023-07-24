import React from "react";
import { FormikHelpers } from "formik";
import { Box, BoxProps, Flex, ThemeIcon } from "@mantine/core";
import { AlignLeft } from "react-feather";
import {
    $UpdatePublicOfferRequest,
    GetPublicOfferResponse,
    UpdatePublicOfferRequest,
    staticPageApi,
    usePublicOffer,
} from "@entities/staticPage";
import { Button, FTextEditor, Heading, ManagedForm } from "@shared/ui";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { initialValues } from "./constants";
import { adaptDataForUpdatePublicOfferForm } from "./utils";
import useStyles from "./UpdatePublicOfferForm.styles";

export interface UpdatePublicOfferFormProps extends BoxProps {}

const UpdatePublicOfferForm = (props: UpdatePublicOfferFormProps) => {
    const { classes } = useStyles();
    const { data } = usePublicOffer();

    const updatePublicOffer = (values: UpdatePublicOfferRequest) => {
        return staticPageApi.updatePublicOffer(values);
    };

    const onSuccess = (response: GetPublicOfferResponse, { resetForm }: Omit<FormikHelpers<UpdatePublicOfferRequest>, "setFieldError">) => {
        resetForm({ values: { ...initialValues, ...adaptDataForUpdatePublicOfferForm(response) } });
    };

    return (
        <Box {...props}>
            <ManagedForm<UpdatePublicOfferRequest, GetPublicOfferResponse>
                initialValues={{ ...initialValues, ...adaptDataForUpdatePublicOfferForm(data) }}
                validationSchema={$UpdatePublicOfferRequest}
                mutationKey={[MutationKeys.UPDATE_PUBLIC_OFFER]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_PUBLIC_OFFER] }]}
                mutationFunction={updatePublicOffer}
                onSuccess={onSuccess}
                hasConfirmModal>
                {({ dirty, onCancel }) => (
                    <>
                        <Flex gap={16} align="center">
                            <ThemeIcon color="gray45">
                                <AlignLeft />
                            </ThemeIcon>
                            <Heading order={4} color="dark">
                                Текстовая информация
                            </Heading>
                        </Flex>
                        <FTextEditor mt={24} name="publicOfferContent" className={classes.textEditorContent} />
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

export default UpdatePublicOfferForm;
