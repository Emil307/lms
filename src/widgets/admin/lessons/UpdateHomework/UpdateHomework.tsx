import { Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertCircle as AlertCircleIcon, AlertTriangle as AlertTriangleIcon } from "react-feather";
import { FastFieldProps } from "formik/dist/FastField";
import { FastField } from "formik";
import { Button, FFileInputMultiple, FSelect, FTextEditor, Heading, ManagedForm, Paragraph } from "@shared/ui";
import {
    AdminHomework,
    HomeworkRequiredType,
    lessonApi,
    UpdateAdminHomeworkFormValues,
    UpdateAdminHomeworkResponse,
} from "@entities/lesson";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { createNotification, ToastType } from "@shared/utils";
import { requiredTypeOptions } from "@widgets/admin/lessons/UpdateHomework/constants";
import { adaptDataForUpdateHomeworkRequest, getInitialValues } from "./utils";
import useStyles from "./UpdateHomework.styles";
import { useMediaQuery } from "@mantine/hooks";

interface UpdateHomeworkProps {
    lessonId: string;
    homework: AdminHomework | null;
    onClose: () => void;
}

const UpdateHomework = ({ homework, lessonId, onClose }: UpdateHomeworkProps) => {
    const { classes } = useStyles();

    const isMobile = useMediaQuery("(max-width: 744px)");

    const updateHomework = (data: UpdateAdminHomeworkFormValues) => {
        return lessonApi.updateAdminHomework(adaptDataForUpdateHomeworkRequest({ ...data, id: lessonId }));
    };

    const onSuccessUpdate = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления домашнего задания",
        });
    };

    const renderLabelWithIcon = (requiredType: HomeworkRequiredType) => {
        if (requiredType === "required") {
            return (
                <>
                    <Flex className={classes.alertIconWrapper} align="center" justify="center">
                        <ThemeIcon w={48} h={48} color="secondary">
                            <AlertCircleIcon />
                        </ThemeIcon>
                    </Flex>
                    <Flex gap={2} direction="column">
                        <Heading order={4}>Обязательная проверка</Heading>
                        <Paragraph variant="text-caption">
                            Без выполнения домашнего задания доступ к следующему уроку будет недоступен
                        </Paragraph>
                    </Flex>
                </>
            );
        }
        return (
            <>
                <Flex className={classes.warningIconWrapper} align="center" justify="center">
                    <ThemeIcon w={48} h={48} color="warning">
                        <AlertTriangleIcon />
                    </ThemeIcon>
                </Flex>
                <Flex gap={2} direction="column">
                    <Heading order={4}>Без проверки</Heading>
                    <Paragraph variant="text-caption">Доступ к следующему уроку будет открыт автоматически</Paragraph>
                </Flex>
            </>
        );
    };

    return (
        <ManagedForm<UpdateAdminHomeworkFormValues, UpdateAdminHomeworkResponse>
            initialValues={getInitialValues(homework)}
            mutationKey={[MutationKeys.UPDATE_ADMIN_LESSON_HOMEWORK, lessonId]}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_LESSON_HOMEWORK, lessonId] }]}
            mutationFunction={updateHomework}
            onSuccess={onSuccessUpdate}
            onError={onError}
            hasConfirmModal
            validateOnChange={false}
            onCancel={onClose}>
            {({ values, dirty, onCancel }) => (
                <Flex gap={32} direction="column" w="100%" maw={1162}>
                    <Flex className={classes.topCard} gap={32} align="center" justify="space-between">
                        <Flex gap={16} align="center">
                            {renderLabelWithIcon(values.requiredType)}
                        </Flex>
                        <FSelect
                            name="requiredType"
                            size="sm"
                            data={requiredTypeOptions}
                            label="Обязательная проверка"
                            w="100%"
                            maw={252}
                        />
                    </Flex>
                    <FastField name="content">
                        {(props: FastFieldProps<string>) => <FTextEditor {...props.field} contentHeight={272} />}
                    </FastField>
                    <FFileInputMultiple
                        name="files"
                        type="document"
                        fileFormats={["jpg", "jpeg", "png", "pdf", "doc", "docx"]}
                        descriptionInside="jpg, png, pdf, doc, docx"
                        h={190}
                        w="100%"
                    />
                    <Flex className={classes.buttons}>
                        <Button className={classes.button} variant="border" size={isMobile ? "medium" : "large"} onClick={onCancel}>
                            Отменить
                        </Button>
                        <Button
                            className={classes.button}
                            type="submit"
                            variant="secondary"
                            size={isMobile ? "medium" : "large"}
                            disabled={!dirty}>
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>
            )}
        </ManagedForm>
    );
};

export default UpdateHomework;
