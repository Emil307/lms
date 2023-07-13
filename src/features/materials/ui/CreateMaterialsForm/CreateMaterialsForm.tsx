import { Box, Flex } from "@mantine/core";
import React from "react";
import { FormikConfig } from "formik";
import { Button, FFileInputMultiple, Form } from "@shared/ui";
import { CreateMaterialsDataForm, FileTypeCard, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials";
import { getDataFromSessionStorage } from "@shared/utils";
import { UploadedFile } from "@shared/types";
import { $createMaterialsFormValidationSchema, CreateMaterialsFormValidationSchema } from "./types";
import { getInitialValues } from "./utils";

interface CreateMaterialsFormProps {
    data: FileTypeCard;
    onSubmit: (materials: UploadedFile[], type: "document" | "video") => void;
    onClose: () => void;
}

const CreateMaterialsForm = ({ data, onSubmit, onClose }: CreateMaterialsFormProps) => {
    const sessionStorageData = getDataFromSessionStorage<CreateMaterialsDataForm>(MATERIALS_LOCAL_STORAGE_KEY);

    const config: FormikConfig<CreateMaterialsFormValidationSchema> = {
        initialValues: getInitialValues(sessionStorageData),
        validationSchema: $createMaterialsFormValidationSchema,
        onSubmit: (values) => {
            sessionStorage.setItem(MATERIALS_LOCAL_STORAGE_KEY, JSON.stringify({ ...sessionStorageData, ...values }));
            onSubmit(values.materials, data.type);
        },
    };
    return (
        <Form config={config} disableOverlay>
            <Box h={472} mb={16}>
                <FFileInputMultiple
                    type={data.type}
                    name="materials"
                    educational
                    fileFormats={data.fileFormats}
                    w="100%"
                    containerFilesProps={{ sx: { overflow: "auto", height: 270 } }}
                    descriptionInside={data.description}
                />
            </Box>
            <Flex gap={8}>
                <Button type="button" size="large" variant="border" onClick={onClose} w="100%">
                    Отмена
                </Button>
                <Button type="submit" size="large" variant="secondary" w="100%">
                    Далее
                </Button>
            </Flex>
        </Form>
    );
};

export default CreateMaterialsForm;
