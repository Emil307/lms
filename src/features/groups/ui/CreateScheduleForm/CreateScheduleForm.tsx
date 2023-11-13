import { Box, BoxProps, Flex } from "@mantine/core";
import { FieldArray } from "formik";
import { PlusCircle, Trash } from "react-feather";
import { Button, FDatePicker, FTimeInput, ManagedForm } from "@shared/ui";
import { CreateAdminGroupScheduleResponse, groupApi } from "@entities/group";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification, useMedia } from "@shared/utils";
import { $CreateScheduleFormValidation, CreateScheduleFormValidation } from "./types";
import { adaptCreateGroupScheduleRequest } from "./utils";
import { initialValues } from "./constants";

export interface CreateScheduleFormProps extends BoxProps {
    groupId: string;
    onClose: () => void;
}

const CreateScheduleForm = ({ groupId, onClose, ...props }: CreateScheduleFormProps) => {
    const isMobile = useMedia("xs");

    const createGroupSchedule = (values: CreateScheduleFormValidation) => {
        return groupApi.createAdminGroupSchedule({ ...adaptCreateGroupScheduleRequest(values), groupId });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Добавление занятия",
            message: "Занятия успешно добавлены в группу",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка добавления занятия",
        });
    };

    return (
        <Box {...props}>
            <ManagedForm<CreateScheduleFormValidation, CreateAdminGroupScheduleResponse>
                initialValues={initialValues}
                validationSchema={$CreateScheduleFormValidation}
                mutationKey={[MutationKeys.CREATE_ADMIN_GROUP_SCHEDULE]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_GROUP_SCHEDULES] }]}
                mutationFunction={createGroupSchedule}
                disableOverlay
                onSuccess={onSuccess}
                onError={onError}>
                {({ dirty, values, isLoading }) => (
                    <>
                        <Flex direction="column" gap={16} mb={24}>
                            <FDatePicker name="scheduleDate" label="Выберите дату" />
                            <FieldArray name="scheduleTimings">
                                {({ remove, push }) => {
                                    const handleAddInterval = () => push({ to: null, from: null });

                                    return (
                                        <Flex direction="column" gap={16}>
                                            <Button
                                                type="button"
                                                variant="text"
                                                leftIcon={<PlusCircle />}
                                                onClick={handleAddInterval}
                                                w="min-content"
                                                size="small">
                                                Добавить интервал
                                            </Button>
                                            {values.scheduleTimings.map((_scheduleTiming, index) => {
                                                const handleRemoveInterval = () => remove(index);
                                                return (
                                                    <Flex key={index} align="center" justify="space-between">
                                                        <Flex gap={8}>
                                                            <FTimeInput
                                                                name={`scheduleTimings.${index}.from`}
                                                                label="Начало"
                                                                size="sm"
                                                                w={90}
                                                            />
                                                            <FTimeInput
                                                                name={`scheduleTimings.${index}.to`}
                                                                label="Конец"
                                                                size="sm"
                                                                w={90}
                                                            />
                                                        </Flex>

                                                        {index > 0 && (
                                                            <Button
                                                                variant="text"
                                                                size="small"
                                                                leftIcon={<Trash />}
                                                                onClick={handleRemoveInterval}>
                                                                Удалить
                                                            </Button>
                                                        )}
                                                    </Flex>
                                                );
                                            })}
                                        </Flex>
                                    );
                                }}
                            </FieldArray>
                        </Flex>
                        <Flex gap={8}>
                            <Button
                                type="button"
                                variant="border"
                                size={isMobile ? "medium" : "large"}
                                fullWidth
                                onClick={onClose}
                                disabled={isLoading}>
                                Отмена
                            </Button>
                            <Button
                                type="submit"
                                variant="secondary"
                                size={isMobile ? "medium" : "large"}
                                fullWidth
                                loading={isLoading}
                                disabled={!dirty}>
                                Сохранить
                            </Button>
                        </Flex>
                    </>
                )}
            </ManagedForm>
        </Box>
    );
};

export default CreateScheduleForm;
