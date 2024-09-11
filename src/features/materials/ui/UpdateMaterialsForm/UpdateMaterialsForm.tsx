/* eslint-disable jsx-a11y/alt-text */
import { Box, Flex, ScrollArea, Text } from "@mantine/core";
import React, { useMemo, useRef } from "react";
import { FieldArray, FormikConfig, FormikProps } from "formik";
import { ChevronLeft, FileText, PlayCircle, Image } from "react-feather";
import axios from "axios";
import { FControlButtons, FInput, Form, Paragraph, getFileExtension } from "@shared/ui";
import { ToastType, createNotification, getDataFromSessionStorage, useMedia } from "@shared/utils";
import { MaterialType, UploadedFileFromList, useUpdateUploadedFiles } from "@entities/storage";
import { CreateMaterialsDataForm, MATERIALS_LOCAL_STORAGE_KEY, MaterialFile } from "@features/materials/helpers";
import { $UpdateMaterialsFormValidation, UpdateMaterialsFormValidation } from "./types";
import { adaptUpdateMaterialsFormRequest, getInitialValues } from "./utils";
import useStyles from "./UpdateMaterialsForm.styles";
import { ControlPanel } from "./components";

export interface UpdateMaterialsFormProps {
    data?: UploadedFileFromList;
    type: MaterialType;
    onClose: () => void;
    onSubmit: (fileIds: string[]) => void;
    multiple?: boolean;
}
/**
 *
 * @deprecated Не переносите на другие проекты.
 * @returns
 */
const UpdateMaterialsForm = ({ data, type, multiple = false, onClose, onSubmit }: UpdateMaterialsFormProps) => {
    const { classes } = useStyles();
    const formRef = useRef<FormikProps<UpdateMaterialsFormValidation>>(null);

    const isMobile = useMedia("xs");

    const sessionStorageData = getDataFromSessionStorage<CreateMaterialsDataForm>(MATERIALS_LOCAL_STORAGE_KEY);

    const updateMaterials = useUpdateUploadedFiles();

    const renderIcon = (file: MaterialFile) => {
        if (type === "document") {
            return (
                <>
                    <FileText />
                    <Text className={classes.extension}>{getFileExtension(file.extension).toUpperCase()}</Text>
                </>
            );
        } else if (type === "images") {
            return (
                <>
                    <Image />
                    <Text className={classes.extension}>{getFileExtension(file.extension).toUpperCase()}</Text>
                </>
            );
        }

        return (
            <>
                <PlayCircle />
                <Text className={classes.extension}>{getFileExtension(file.extension).toUpperCase()}</Text>
            </>
        );
    };

    const initialValues = useMemo(() => {
        return getInitialValues({ sessionStorageData, data });
    }, []);

    const config: FormikConfig<UpdateMaterialsFormValidation> = {
        initialValues,
        validationSchema: $UpdateMaterialsFormValidation,
        onSubmit: async (values) => {
            updateMaterials.mutate(adaptUpdateMaterialsFormRequest(values), {
                onSuccess: () => {
                    onSubmit(values.materials.map((material) => String(material.id)));
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

    const onCloseModal = () => {
        if (formRef.current) {
            sessionStorage.setItem(MATERIALS_LOCAL_STORAGE_KEY, JSON.stringify({ ...sessionStorageData, ...formRef.current.values }));
        }
        onClose();
    };

    return (
        <Form config={config} disableOverlay customRef={formRef}>
            {({ values }) => (
                <Flex direction="column" gap={16}>
                    <Flex className={classes.contentContainer}>
                        <ControlPanel />
                        <FieldArray name="materials">
                            {() => (
                                <ScrollArea.Autosize
                                    maxHeight={isMobile ? "calc(100vh - 304px)" : 392}
                                    style={{ height: isMobile ? "calc(100vh - 304px)" : 392, width: "100%" }}
                                    type="auto"
                                    offsetScrollbars
                                    scrollbarSize={4}>
                                    <Flex direction="column" gap={16}>
                                        {values.materials.map((file, index) => (
                                            <Flex key={index} gap={16} align="flex-end">
                                                <Box className={classes.icon}>{renderIcon(file)}</Box>
                                                <FInput name={`materials.${index}.name`} label="Название" size="sm" sx={{ flex: 1 }} />
                                                <Paragraph variant="text-small-semi" pb={8}>
                                                    .{file.extension}
                                                </Paragraph>
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
                        onClose={onCloseModal}
                        isLoading={updateMaterials.isLoading}
                        cancelButtonProps={{
                            leftIcon: multiple ? <ChevronLeft /> : null,
                        }}
                        ignoreDirty
                    />
                </Flex>
            )}
        </Form>
    );
};

export default UpdateMaterialsForm;
