import { Box, BoxProps, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlignLeft, Clipboard } from "react-feather";
import { FormikHelpers } from "formik";
import { FControlButtons, FFileInput, FInput, FTextEditor, FTextarea, Heading, ManagedForm } from "@shared/ui";
import { GetAboutResponse, staticPageApi, useAbout } from "@entities/staticPage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { $UpdateAboutValidation, UpdateAboutValidation } from "./types";
import { initialValues } from "./constants";
import { adaptDataForUpdateAboutForm } from "./utils";
import useStyles from "./UpdateAboutForm.styles";

export interface UpdateAboutFormProps extends BoxProps { }

const UpdateAboutForm = (props: UpdateAboutFormProps) => {
    const { classes } = useStyles();
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
                disabledLoadingOnSuccess>
                {({ onCancel }) => (
                    <>
                        <FFileInput
                            title="Загрузите файлы"
                            name="image"
                            type="image"
                            fileFormats={["png", "gif", "jpeg", "jpg", "svg", "webp"]}
                            withDeleteButton
                            className={classes.imageFileUploader}
                            description="До 1Mb"
                        />
                        <Flex gap={16} align="center" mt={24}>
                            <ThemeIcon color="gray45">
                                <Clipboard />
                            </ThemeIcon>
                            <Heading order={4}>Заголовок и описание</Heading>
                        </Flex>
                        <FInput mt={24} label="Заголовок" size="sm" name="aboutPageTitle" maw={772} />
                        <FTextarea name="aboutPageShortContent" mt={8} autosize maw={772} />
                        <Flex gap={16} align="center" mt={32}>
                            <ThemeIcon color="gray45">
                                <AlignLeft />
                            </ThemeIcon>
                            <Heading order={4}>Общая информация</Heading>
                        </Flex>
                        <FTextEditor name="aboutPageFullContent" className={classes.textEditorFullContent} />
                        <FControlButtons className={classes.actions} onClose={onCancel} />
                    </>
                )}
            </ManagedForm>
        </Box>
    );
};

export default UpdateAboutForm;
