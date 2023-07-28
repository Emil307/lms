import { Box, Flex, ScrollArea, Text } from "@mantine/core";
import React from "react";
import { FieldArray, FormikConfig } from "formik";
import { ChevronLeft, FileText, PlayCircle } from "react-feather";
import axios from "axios";
import { useMediaQuery } from "@mantine/hooks";
import { Button, FInput, Form, getFileExtension } from "@shared/ui";
import { ToastType, createNotification, getDataFromSessionStorage } from "@shared/utils";
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

    const isMobile = useMediaQuery("(max-width: 576px)");

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
                                    maxHeight={isMobile ? 456 : 368}
                                    style={{ height: "100%", width: "100%" }}
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
                    <Flex gap={8}>
                        <Button
                            type="button"
                            size={isMobile ? "medium" : "large"}
                            variant="border"
                            onClick={onClose}
                            w="100%"
                            leftIcon={multiple ? <ChevronLeft /> : null}
                            disabled={updateMaterials.isLoading}>
                            {multiple ? "Назад" : "Отмена"}
                        </Button>
                        <Button
                            type="submit"
                            size={isMobile ? "medium" : "large"}
                            variant="secondary"
                            w="100%"
                            loading={updateMaterials.isLoading}>
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>
            )}
        </Form>
    );
};

export default UpdateMaterialsForm;
