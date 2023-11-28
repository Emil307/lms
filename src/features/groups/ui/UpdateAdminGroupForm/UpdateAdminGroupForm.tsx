import { Box, Flex, Grid, BoxProps } from "@mantine/core";
import React from "react";
import { Flag, FolderPlus } from "react-feather";
import dayjs from "dayjs";
import {
    FControlButtons,
    FDateRangePicker,
    FInput,
    FSelect,
    FSwitch,
    LastUpdatedInfo,
    ManagedForm,
    Paragraph,
    prepareOptionsForSelect,
} from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { GetAdminGroupResponse, UpdateAdminGroupResponse, groupApi, useAdminGroupFilters } from "@entities/group";
import { EntityNames, FilterTypes, MutationKeys } from "@shared/constant";
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

    const groupFilters = useAdminGroupFilters({ type: FilterTypes.MANIPULATION });

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
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.GROUP }}
                mutationFunction={updateGroup}
                onSuccess={onSuccessUpdated}
                onError={onError}
                onCancel={onCancel}>
                {({ values, onCancel }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                    return (
                        <Flex direction="column" gap={32}>
                            <Flex className={classes.infoPanel}>
                                <Flex gap={8}>
                                    <Paragraph variant="text-small-m" color="gray45">
                                        ID:
                                    </Paragraph>
                                    <Paragraph variant="text-small-m">{data?.id}</Paragraph>
                                </Flex>
                                <Flex align="center" gap={8}>
                                    <Paragraph variant="text-small-m" color="gray45">
                                        Статус:
                                    </Paragraph>
                                    <FSwitch name="isActive" variant="secondary" label={labelActivitySwitch} labelPosition="left" />
                                </Flex>
                                <Flex gap={8}>
                                    <Paragraph variant="text-small-m" color="gray45">
                                        Учебный курс:
                                    </Paragraph>
                                    <Paragraph variant="text-small-m">{data?.course.name}</Paragraph>
                                </Flex>
                                <Flex gap={8}>
                                    <Paragraph variant="text-small-m" color="gray45">
                                        Создание:
                                    </Paragraph>
                                    <Paragraph variant="text-small-m">{dayjs(data?.createdAt).format("DD.MM.YYYY HH:mm")}</Paragraph>
                                </Flex>
                                <LastUpdatedInfo data={data?.lastUpdated} />
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
                                <Grid gutter={8}>
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
                            <FControlButtons onClose={onCancel} />
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default UpdateAdminGroupForm;
