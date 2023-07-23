import { Flex, ThemeIcon } from "@mantine/core";
import { Button, FFileInputMultiple, FSelect, FTextEditor, Heading, ManagedForm, Paragraph } from "@shared/ui";
import React from "react";
import useStyles from "./UpdateHomework.styles";
import {
    AdminHomework,
    HomeworkRequiredType,
    lessonApi,
    UpdateAdminHomeworkFormValues,
    UpdateAdminHomeworkResponse,
} from "@entities/lesson";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { createNotification, ToastType } from "@shared/utils";
import { adaptDataForUpdateHomeworkRequest, getInitialValues } from "./utils";
import { AlertCircle as AlertCircleIcon, AlertTriangle as AlertTriangleIcon } from "react-feather";
import { requiredTypeOptions } from "@widgets/admin/lessons/UpdateHomework/constants";

interface UpdateHomeworkProps {
    lessonId: string;
    homework: AdminHomework | null;
    onClose: () => void;
}

const UpdateHomework = ({ homework, lessonId, onClose }: UpdateHomeworkProps) => {
    const { classes } = useStyles();

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
            onCancel={onClose}>
            {({ values, dirty, onCancel }) => (
                <Flex gap={32} direction="column" w="100%" maw={1162}>
                    <Flex className={classes.card} gap={32} align="center" justify="space-between">
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
                    <FTextEditor name="content" h={320} />
                    <FFileInputMultiple
                        name="files"
                        type="document"
                        fileFormats={["jpg", "jpeg", "png", "pdf", "doc", "docx"]}
                        descriptionInside="jpg, png, pdf, doc, docx"
                        h={190}
                        w="100%"
                    />
                    <Flex gap={8} mt={32}>
                        <Button variant="border" size="large" w="100%" maw={252} onClick={onCancel}>
                            Отменить
                        </Button>
                        <Button type="submit" variant="secondary" size="large" w="100%" maw={252} disabled={!dirty}>
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>
            )}
        </ManagedForm>
    );
};

export default UpdateHomework;
