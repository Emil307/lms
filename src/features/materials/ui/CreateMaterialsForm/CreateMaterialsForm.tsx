import { Box, Flex } from "@mantine/core";
import React from "react";
import { FormikConfig } from "formik";
import { Button, FFileInputMultiple, Form } from "@shared/ui";
import { CreateMaterialsDataForm, FileTypeCard, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials";
import { getDataFromSessionStorage, useMedia } from "@shared/utils";
import { UploadedFile } from "@shared/types";
import { $CreateMaterialsFormValidation, CreateMaterialsFormValidation } from "./types";
import { getInitialValues } from "./utils";
import useStyles from "./CreateMaterialsForm.styles";

export interface CreateMaterialsFormProps {
    data: FileTypeCard;
    onSubmit: (materials: UploadedFile[], type: "document" | "video") => void;
    onClose: () => void;
}

const CreateMaterialsForm = ({ data, onSubmit, onClose }: CreateMaterialsFormProps) => {
    const { classes } = useStyles();

    const sessionStorageData = getDataFromSessionStorage<CreateMaterialsDataForm>(MATERIALS_LOCAL_STORAGE_KEY);

    const isMobile = useMedia("xs");

    const config: FormikConfig<CreateMaterialsFormValidation> = {
        initialValues: getInitialValues(sessionStorageData),
        validationSchema: $CreateMaterialsFormValidation,
        onSubmit: (values) => {
            sessionStorage.setItem(MATERIALS_LOCAL_STORAGE_KEY, JSON.stringify({ ...sessionStorageData, ...values }));
            onSubmit(values.materials, data.type);
        },
    };
    return (
        <Form config={config} disableOverlay>
            <Box className={classes.fileInputWrapper}>
                <FFileInputMultiple
                    type={data.type}
                    name="materials"
                    educational
                    fileFormats={data.fileFormats}
                    w="100%"
                    containerFilesProps={{ className: classes.fileInputContainerFiles }}
                    descriptionInside={data.description}
                />
            </Box>
            <Flex gap={8}>
                <Button type="button" size={isMobile ? "medium" : "large"} variant="border" onClick={onClose} w="50%">
                    Отмена
                </Button>
                <Button type="submit" size={isMobile ? "medium" : "large"} variant="secondary" w="50%">
                    Далее
                </Button>
            </Flex>
        </Form>
    );
};

export default CreateMaterialsForm;
