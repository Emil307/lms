import { Box, Flex, Text } from "@mantine/core";
import React from "react";
import { FieldArray, FormikConfig } from "formik";
import { ChevronLeft, FileText, PlayCircle } from "react-feather";
import axios from "axios";
import { Button, FInput, Form, getFileExtension } from "@shared/ui";
import { ToastType, createNotification, getDataFromSessionStorage } from "@shared/utils";
import { CreateMaterialsDataForm, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials";
import { useUpdateUploadedFiles } from "@entities/storage";
import { $updateMaterialsFormValidationSchema, MaterialFile, UpdateMaterialsFormValidationSchema } from "./types";
import { adaptEditMaterialsFormRequest, getInitialValues } from "./utils";
import useStyles from "./EditMaterialsForm.styles";
import { ControlPanel } from "./components";

export interface EditMaterialsFormProps {
    data: MaterialFile[];
    hasCategories?: boolean;
    type: "document" | "video";
    onClose: () => void;
    onSubmit: () => void;
}

const EditMaterialsForm = ({ data, hasCategories, type, onClose, onSubmit }: EditMaterialsFormProps) => {
    const { classes } = useStyles();

    const sessionStorageData = getDataFromSessionStorage<CreateMaterialsDataForm>(MATERIALS_LOCAL_STORAGE_KEY);

    const updateMaterials = useUpdateUploadedFiles();

    const renderIcon = (file: MaterialFile) => {
        if (type === "document") {
            return (
                <>
                    <FileText />
                    <Text className={classes.extension}>{getFileExtension(file.extension)}</Text>
                </>
            );
        }

        return (
            <>
                <PlayCircle />
                <Text className={classes.extension}>{getFileExtension(file.extension)}</Text>
            </>
        );
    };

    const config: FormikConfig<UpdateMaterialsFormValidationSchema> = {
        initialValues: getInitialValues({ sessionStorageData, data, hasCategories }),
        validationSchema: $updateMaterialsFormValidationSchema,
        onSubmit: async (values) => {
            updateMaterials.mutate(adaptEditMaterialsFormRequest(values, sessionStorageData?.categoryIds), {
                onSuccess: () => {
                    onSubmit();
                },
                onError: (error) => {
                    if (axios.isAxiosError(error)) {
                        for (const errorField in error.response?.data.errors) {
                            createNotification({
                                type: ToastType.ERROR,
                                title: "Редактирование материалов",
                                message: error.response?.data.errors[errorField][0],
                            });
                        }
                    }
                },
            });
        },
    };
    return (
        <Form config={config} disableOverlay>
            {({ values }) => {
                return (
                    <>
                        <Box h={472} mb={16}>
                            <ControlPanel mb={24} />
                            <FieldArray name="files">
                                {() => (
                                    <Flex direction="column" gap={16}>
                                        {values.files.map((file, index) => (
                                            <Flex key={index} gap={16}>
                                                <Box className={classes.icon}>{renderIcon(file)}</Box>
                                                <FInput name={`files.${index}.name`} label="Название" size="sm" sx={{ flex: 1 }} />
                                            </Flex>
                                        ))}
                                    </Flex>
                                )}
                            </FieldArray>
                        </Box>
                        <Flex gap={8}>
                            <Button
                                type="button"
                                size="large"
                                variant="border"
                                onClick={onClose}
                                w="100%"
                                leftIcon={<ChevronLeft />}
                                disabled={updateMaterials.isLoading}>
                                Назад
                            </Button>
                            <Button type="submit" size="large" variant="secondary" w="100%" disabled={updateMaterials.isLoading}>
                                Сохранить
                            </Button>
                        </Flex>
                    </>
                );
            }}
        </Form>
    );
};

export default EditMaterialsForm;
