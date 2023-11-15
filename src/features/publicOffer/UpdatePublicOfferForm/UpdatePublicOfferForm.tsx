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
import { FControlButtons, FTextEditor, Heading, ManagedForm } from "@shared/ui";
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
                {({ onCancel }) => (
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
                        <FControlButtons onClose={onCancel} mt={32} />
                    </>
                )}
            </ManagedForm>
        </Box>
    );
};

export default UpdatePublicOfferForm;
