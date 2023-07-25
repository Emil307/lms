import { Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { Button, FInput, Heading, ManagedForm, Paragraph } from "@shared/ui";
import { AdminTest, lessonApi, UpdateAdminTestResponse } from "@entities/lesson";
import MarkCheckCircleIcon from "public/icons/mark-check-circle.svg";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { createNotification, ToastType } from "@shared/utils";
import { QuestionList } from "./components";
import { $UpdateTestFormValues, UpdateTestFormValues } from "./types";
import useStyles from "./UpdateTest.styles";
import { adaptUpdateTestRequest, getInitialValues } from "./utils";

interface UpdateTestProps {
    lessonId: string;
    test: AdminTest | null;
    onClose: () => void;
}

const UpdateTest = ({ test, lessonId, onClose }: UpdateTestProps) => {
    const { classes } = useStyles({ greenCheckIcon: true });

    const updateTest = (data: UpdateTestFormValues) => {
        return lessonApi.updateAdminTest(adaptUpdateTestRequest(data, lessonId));
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
            title: "Ошибка обновления теста",
        });
    };

    return (
        <ManagedForm<UpdateTestFormValues, UpdateAdminTestResponse>
            initialValues={getInitialValues(test)}
            validationSchema={$UpdateTestFormValues}
            mutationKey={[MutationKeys.UPDATE_LESSON_TEST, lessonId]}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_LESSON_TEST, lessonId] }]}
            mutationFunction={updateTest}
            onSuccess={onSuccessUpdate}
            onError={onError}
            hasConfirmModal
            onCancel={onClose}>
            {({ dirty, onCancel }) => (
                <Flex gap={32} direction="column" w="100%" maw={1162}>
                    <Flex className={classes.card} gap={32} align="center" justify="space-between">
                        <Flex gap={16} align="center">
                            <Flex className={classes.checkIconWrapper} align="center" justify="center">
                                <ThemeIcon w={48} h={48} color="secondary">
                                    <MarkCheckCircleIcon />
                                </ThemeIcon>
                            </Flex>
                            <Flex gap={2} direction="column">
                                <Heading order={4}>Количество верных ответов</Heading>
                                <Paragraph variant="text-caption">Для успешного прохождения тестирования</Paragraph>
                            </Flex>
                        </Flex>
                        <FInput name="correctAnswersCount" type="number" label="Количество ответов" maw={252} w="100%" />
                    </Flex>

                    <QuestionList />

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

export default UpdateTest;
