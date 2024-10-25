import React from "react";
import { FormikConfig } from "formik";
import { FControlButtons, FFileInputMultiple, Form } from "@shared/ui";
import { getDataFromSessionStorage } from "@shared/utils";
import { CreateMaterialsDataForm, IMaterialTypeCard, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials/helpers";
import { $CreateMaterialsFormValidation, CreateMaterialsFormValidation } from "./types";
import { getInitialValues } from "./utils";
import useStyles from "./CreateMaterialsForm.styles";

export interface CreateMaterialsFormProps {
    data: IMaterialTypeCard;
    onSubmit: (type: "document" | "video" | "images") => void;
    onClose: () => void;
}

const CreateMaterialsForm = ({ data, onSubmit, onClose }: CreateMaterialsFormProps) => {
    const { classes } = useStyles();

    const sessionStorageData = getDataFromSessionStorage<CreateMaterialsDataForm>(MATERIALS_LOCAL_STORAGE_KEY);

    const config: FormikConfig<CreateMaterialsFormValidation> = {
        initialValues: getInitialValues(sessionStorageData),
        validationSchema: $CreateMaterialsFormValidation,
        validateOnChange: true,
        onSubmit: (values) => {
            sessionStorage.setItem(MATERIALS_LOCAL_STORAGE_KEY, JSON.stringify({ ...sessionStorageData, ...values }));
            onSubmit(data.type);
        },
    };
    return (
        <Form config={config} disableOverlay>
            <FFileInputMultiple
                type={data.type}
                name="files"
                educational
                fileFormats={data.fileFormats}
                w="100%"
                containerFilesProps={{ className: classes.fileInputContainerFiles }}
                descriptionInside={data.description}
                invalidateOnSuccess={false}
            />
            <FControlButtons variant="modal" cancelButtonText="Отмена" submitButtonText="Далее" onClose={onClose} ignoreDirty />
        </Form>
    );
};

export default CreateMaterialsForm;
