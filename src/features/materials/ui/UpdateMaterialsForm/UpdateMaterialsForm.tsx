import { Box, Flex, ScrollArea, Text } from "@mantine/core";
import React from "react";
import { FieldArray, FormikConfig } from "formik";
import { ChevronLeft, FileText, PlayCircle } from "react-feather";
import axios from "axios";
import { FControlButtons, FInput, Form, getFileExtension } from "@shared/ui";
import { ToastType, createNotification, getDataFromSessionStorage, useMedia } from "@shared/utils";
import { CreateMaterialsDataForm, MATERIALS_LOCAL_STORAGE_KEY } from "@features/materials";
import { MaterialType, useUpdateUploadedFiles } from "@entities/storage";
import { $UpdateMaterialsFormValidation, MaterialFile, UpdateMaterialsFormValidation } from "./types";
import { adaptUpdateMaterialsFormRequest, getInitialValues } from "./utils";
import useStyles from "./UpdateMaterialsForm.styles";
import { ControlPanel } from "./components";

export interface UpdateMaterialsFormProps {
    data: MaterialFile[];
    hasCategories?: boolean;
    type: MaterialType;
    onClose: () => void;
    onSubmit: (fileIds: string[]) => void;
    multiple?: boolean;
}

const UpdateMaterialsForm = ({ data, hasCategories, type, multiple = false, onClose, onSubmit }: UpdateMaterialsFormProps) => {
    const { classes } = useStyles();

    const isMobile = useMedia("xs");

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

    const config: FormikConfig<UpdateMaterialsFormValidation> = {
        initialValues: getInitialValues({ sessionStorageData, data, hasCategories }),
        validationSchema: $UpdateMaterialsFormValidation,
        onSubmit: async (values) => {
            updateMaterials.mutate(adaptUpdateMaterialsFormRequest(values, sessionStorageData?.categoryIds), {
                onSuccess: () => {
                    onSubmit(values.files.map((file) => String(file.id)));
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
            {({ values }) => (
                <Flex direction="column" gap={16}>
                    <Flex className={classes.contentContainer}>
                        <ControlPanel />
                        <FieldArray name="files">
                            {() => (
                                <ScrollArea.Autosize
                                    maxHeight={isMobile ? "calc(100vh - 304px)" : 392}
                                    style={{ height: isMobile ? "calc(100vh - 304px)" : 392, width: "100%" }}
                                    type="auto"
                                    offsetScrollbars
                                    scrollbarSize={4}>
                                    <Flex direction="column" gap={16}>
                                        {values.files.map((file, index) => (
                                            <Flex key={index} gap={16}>
                                                <Box className={classes.icon}>{renderIcon(file)}</Box>
                                                <FInput name={`files.${index}.name`} label="Название" size="sm" sx={{ flex: 1 }} />
                                            </Flex>
                                        ))}
                                    </Flex>
                                </ScrollArea.Autosize>
                            )}
                        </FieldArray>
                    </Flex>
                    <FControlButtons
                        variant="modal"
                        cancelButtonText={multiple ? "Назад" : "Отмена"}
                        onClose={onClose}
                        isLoading={updateMaterials.isLoading}
                        cancelButtonProps={{
                            leftIcon: multiple ? <ChevronLeft /> : null,
                        }}
                    />
                </Flex>
            )}
        </Form>
    );
};

export default UpdateMaterialsForm;
