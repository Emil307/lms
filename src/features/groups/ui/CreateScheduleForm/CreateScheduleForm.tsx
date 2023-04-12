import { Box, Flex, Group } from "@mantine/core";
import { FieldArray, FormikConfig } from "formik";
import axios from "axios";
import { PlusCircle, Trash } from "react-feather";
import { Button, FDatePicker, FTimeRangeInput, Form } from "@shared/ui";
import { $addScheduleToGroupRequest, AddScheduleToGroupRequest, useAddScheduleToGroup } from "@entities/group";

export interface CreateScheduleFormProps {
    groupId?: string;
    onClose: () => void;
}

const CreateScheduleForm = ({ groupId, onClose }: CreateScheduleFormProps) => {
    const { mutate: addScheduleToGroup } = useAddScheduleToGroup(groupId);

    const config: FormikConfig<AddScheduleToGroupRequest> = {
        initialValues: {
            scheduleDate: null,
            scheduleTimings: [],
        },
        validationSchema: $addScheduleToGroupRequest,
        onSubmit: async (values, { setFieldError }) => {
            addScheduleToGroup(values, {
                onSuccess: () => {
                    onClose();
                },
                onError: (error) => {
                    if (axios.isAxiosError(error)) {
                        for (const errorField in error.response?.data.errors) {
                            setFieldError(errorField, error.response?.data.errors[errorField][0]);
                        }
                    }
                },
            });
        },
    };

    return (
        <Box>
            <Form config={config} disableOverlay>
                {({ values }) => (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                marginBottom: 24,
                            }}>
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
                                                        <FTimeRangeInput
                                                            name={`scheduleTimings.${index}.from`}
                                                            nameTo={`scheduleTimings.${index}.to`}
                                                            label="Время занятия"
                                                        />
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
                        </Box>
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
            </Form>
        </Box>
    );
};

export default CreateScheduleForm;
