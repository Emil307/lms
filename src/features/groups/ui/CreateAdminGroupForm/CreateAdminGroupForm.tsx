import { Box, Text, Flex, Grid, BoxProps } from "@mantine/core";
import React from "react";
import { Flag, FolderPlus } from "react-feather";
import { Button, FDateRangePicker, FInput, FSelect, FSwitch, ManagedForm, prepareOptionsForSelect } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { CreateAdminGroupResponse, groupApi, useAdminGroupFilters } from "@entities/group";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { $CreateGroupFormValidation, CreateGroupFormValidation } from "./types";
import { adaptCreateAdminGroupRequest, adaptCreateAdminGroupForm } from "./utils";

export interface CreateAdminGroupFormProps extends BoxProps {
    courseId?: string;
    onSuccess: (group: CreateAdminGroupResponse) => void;
    onCancel: () => void;
}

const CreateAdminGroupForm = ({ courseId, onSuccess, onCancel, ...props }: CreateAdminGroupFormProps) => {
    const groupFilters = useAdminGroupFilters({ type: "manipulation" });

    const createGroup = (values: CreateGroupFormValidation) => {
        return groupApi.createAdminGroup(adaptCreateAdminGroupRequest(values));
    };

    const onSuccessCreated = (response: CreateAdminGroupResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание группы",
            message: "Группа успешно создана",
        });
        onSuccess(response);
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания группы",
        });
    };

    return (
        <Box {...props}>
            <ManagedForm<CreateGroupFormValidation, CreateAdminGroupResponse>
                initialValues={adaptCreateAdminGroupForm(courseId)}
                validationSchema={$CreateGroupFormValidation}
                mutationKey={[MutationKeys.CREATE_ADMIN_GROUP]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_GROUPS] }]}
                mutationFunction={createGroup}
                onSuccess={onSuccessCreated}
                onError={onError}
                hasConfirmModal
                onCancel={onCancel}>
                {({ values, dirty, onCancel }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    return (
                        <Flex direction="column" gap={32}>
                            <Flex gap={8} align="center">
                                <Text color="gray45">Статус:</Text>
                                <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                            </Flex>
                            <Fieldset label="Направление обучения" icon={<Flag />} legendProps={{ mb: 24 }}>
                                <FSelect
                                    name="courseId"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: groupFilters.data?.courses,
                                        value: "id",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Выберите курс"
                                    disabled={!!courseId || groupFilters.isLoading}
                                    w="100%"
                                />
                            </Fieldset>
                            <Fieldset label="Данные группы" icon={<FolderPlus />} legendProps={{ mb: 24 }}>
                                <Grid>
                                    <Grid.Col>
                                        <FInput label="Название группы" name="name" size="sm" />
                                    </Grid.Col>
                                    <Grid.Col xs={6}>
                                        <FDateRangePicker
                                            name="educationStartDate"
                                            nameTo="educationFinishDate"
                                            label="Даты обучения"
                                            allowLevelChange={false}
                                            size="sm"
                                        />
                                    </Grid.Col>
                                    <Grid.Col xs={6}>
                                        <FInput label="Учеников в группе (max)" name="maxStudentsCount" type="number" size="sm" />
                                    </Grid.Col>
                                    <Grid.Col>
                                        <FSelect
                                            name="teacherId"
                                            size="sm"
                                            data={prepareOptionsForSelect({
                                                data: groupFilters.data?.teachers,
                                                value: "id",
                                                label: ({ profile }) => [profile.lastName, profile.firstName].join(" "),
                                            })}
                                            clearable
                                            label="Выберите преподавателя"
                                            disabled={groupFilters.isLoading}
                                        />
                                    </Grid.Col>
                                </Grid>
                            </Fieldset>
                            <Flex gap={8}>
                                <Button variant="border" size="large" onClick={onCancel}>
                                    Отменить
                                </Button>
                                <Button type="submit" variant="secondary" size="large" disabled={!dirty}>
                                    Сохранить
                                </Button>
                            </Flex>
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default CreateAdminGroupForm;
