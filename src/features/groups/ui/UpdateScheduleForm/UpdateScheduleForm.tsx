import { Box, BoxProps, Flex, Group } from "@mantine/core";
import { FieldArray } from "formik";
import { PlusCircle, Trash } from "react-feather";
import { Button, FDatePicker, FTimeInput, ManagedForm } from "@shared/ui";
import { AdminGroupScheduleFromList, UpdateAdminGroupScheduleResponse, groupApi } from "@entities/group";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { $UpdateScheduleFormValidation, UpdateScheduleFormValidation } from "./types";
import { adaptUpdateGroupScheduleRequest, adaptUpdateScheduleForm } from "./utils";
import { initialValues } from "./constants";

export interface UpdateScheduleFormProps extends BoxProps {
    groupId: string;
    data: AdminGroupScheduleFromList;
    onClose: () => void;
}

const UpdateScheduleForm = ({ groupId, data, onClose, ...props }: UpdateScheduleFormProps) => {
    const updateGroupSchedule = (values: UpdateScheduleFormValidation) => {
        return groupApi.updateAdminGroupSchedule({ ...adaptUpdateGroupScheduleRequest(values), groupId, scheduleId: data.id });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления занятия",
        });
    };

    return (
        <Box {...props}>
            <ManagedForm<UpdateScheduleFormValidation, UpdateAdminGroupScheduleResponse>
                initialValues={{ ...initialValues, ...adaptUpdateScheduleForm(data) }}
                validationSchema={$UpdateScheduleFormValidation}
                mutationKey={[MutationKeys.UPDATE_ADMIN_GROUP_SCHEDULE]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_GROUP_SCHEDULES] }]}
                mutationFunction={updateGroupSchedule}
                onSuccess={onSuccess}
                onError={onError}>
                {({ values }) => (
                    <>
                        <Flex direction="column" gap={24} mb={24}>
                            <FDatePicker name="scheduleDate" label="Выберите дату" />
                            <FieldArray name="scheduleTimings">
                                {({ remove, push }) => {
                                    const handleAddInterval = () => push({ to: null, from: null });

                                    return (
                                        <Flex direction="column" gap={16}>
                                            <Button
                                                type="button"
                                                variant="text"
                                                leftIcon={<PlusCircle width={15} height={15} />}
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
                                                            <FTimeInput name={`scheduleTimings.${index}.from`} label="Начало" w={90} />
                                                            <FTimeInput name={`scheduleTimings.${index}.to`} label="Конец" w={90} />
                                                        </Flex>

                                                        <Button
                                                            variant="text"
                                                            size="small"
                                                            leftIcon={<Trash width={17} height={17} />}
                                                            onClick={handleRemoveInterval}>
                                                            Удалить
                                                        </Button>
                                                    </Flex>
                                                );
                                            })}
                                        </Flex>
                                    );
                                }}
                            </FieldArray>
                        </Flex>
                        <Group sx={{ flexWrap: "nowrap" }}>
                            <Button type="button" variant="border" fullWidth onClick={onClose}>
                                Отмена
                            </Button>
                            <Button type="submit" variant="secondary" fullWidth>
                                Сохранить
                            </Button>
                        </Group>
                    </>
                )}
            </ManagedForm>
        </Box>
    );
};

export default UpdateScheduleForm;
