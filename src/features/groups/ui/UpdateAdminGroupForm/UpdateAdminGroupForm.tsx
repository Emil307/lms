import { Box, Text, Flex, Grid, BoxProps } from "@mantine/core";
import React from "react";
import { Flag, FolderPlus } from "react-feather";
import dayjs from "dayjs";
import { Button, FDateRangePicker, FInput, FSelect, FSwitch, ManagedForm, prepareOptionsForSelect } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { GetAdminGroupResponse, UpdateAdminGroupResponse, groupApi, useAdminGroupFilters } from "@entities/group";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { $UpdateGroupFormValidation, UpdateGroupFormValidation } from "./types";
import { adaptUpdateAdminGroupForm, adaptUpdateAdminGroupRequest } from "./utils";
import useStyles from "./UpdateAdminGroupForm.styles";

export interface UpdateAdminGroupFormProps extends BoxProps {
    courseId?: string;
    data?: GetAdminGroupResponse;
    onSuccess: (group: UpdateAdminGroupResponse) => void;
    onCancel: () => void;
}

const UpdateAdminGroupForm = ({ data, courseId, onSuccess, onCancel, ...props }: UpdateAdminGroupFormProps) => {
    const { classes } = useStyles();

    const groupFilters = useAdminGroupFilters({ type: "manipulation" });

    const updateGroup = (values: UpdateGroupFormValidation) => {
        return groupApi.updateAdminGroup({ ...adaptUpdateAdminGroupRequest(values), id: String(data?.id) });
    };

    const onSuccessUpdated = (response: UpdateAdminGroupResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены",
        });
        onSuccess(response);
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления группы",
        });
    };

    return (
        <Box {...props}>
            <ManagedForm<UpdateGroupFormValidation, UpdateAdminGroupResponse>
                initialValues={adaptUpdateAdminGroupForm(data)}
                validationSchema={$UpdateGroupFormValidation}
                mutationKey={[MutationKeys.UPDATE_ADMIN_GROUP]}
                keysInvalidateQueries={[
                    { queryKey: [QueryKeys.GET_ADMIN_GROUPS] },
                    { queryKey: [QueryKeys.GET_ADMIN_GROUP, String(data?.id)] },
                ]}
                mutationFunction={updateGroup}
                onSuccess={onSuccessUpdated}
                onError={onError}
                hasConfirmModal
                onCancel={onCancel}>
                {({ values, dirty, onCancel }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    return (
                        <Flex direction="column" gap={32}>
                            <Flex gap={32} align="center">
                                <Box className={classes.infoItem}>
                                    ID: <span>{data?.id}</span>
                                </Box>
                                <Flex gap={8}>
                                    <Text className={classes.infoItem}>Статус:</Text>
                                    <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                                </Flex>
                                <Box className={classes.infoItem}>
                                    Учебный курс: <span>{data?.course.name}</span>
                                </Box>
                                <Box className={classes.infoItem}>
                                    Создание: <span>{data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                                </Box>
                                {/* TODO:  https://gitlab.addamant-work.ru/business-gallery/business-gallery-back/-/issues/156*/}
                                {/* <LastUpdatedInfo data={data?.lastUpdated} /> */}
                            </Flex>
                            <Fieldset label="Направление обучения" icon={<Flag />} legendProps={{ mb: 24 }} maw={512}>
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
                                    disabled={true}
                                    w="100%"
                                />
                            </Fieldset>
                            <Fieldset label="Данные группы" icon={<FolderPlus />} legendProps={{ mb: 24 }} maw={512}>
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
                            <Flex gap={8} maw={512}>
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

export default UpdateAdminGroupForm;
