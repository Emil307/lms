import { Box, Text, Flex, Grid, Title, Badge } from "@mantine/core";
import { FormikConfig } from "formik";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { FolderPlus, User } from "react-feather";
import axios from "axios";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { Button, FDateRangePicker, FInput, Form, FSwitch, Switch } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { $CreateGroupRequest, CreateGroupRequest, Group, useUpdateGroup } from "@entities/group";
import { initialValuesCreateGroupForm } from "@features/groups/api";
import { adaptDataForEditGroupForm } from "@features/groups";
import useStyles from "./EditGroupForm.styles";

export interface EditGroupFormProps {
    data?: Group;
    onClose: () => void;
}

const EditGroupForm = ({ data, onClose }: EditGroupFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const [showTeachersSelect, setShowTeachersSelect] = useState(false);

    const updateGroup = useUpdateGroup(String(data?.id));

    const renderStatus = useMemo(() => {
        switch (data?.status) {
            case "notStarted":
                return "Новая";
            case "done":
                return "Завершена";
            default:
                break;
        }
    }, [data?.status]);

    const handleChangeSwitch = useCallback((newValue: ChangeEvent<HTMLInputElement>) => setShowTeachersSelect(newValue.target.checked), []);

    const config: FormikConfig<CreateGroupRequest> = {
        initialValues: {
            ...initialValuesCreateGroupForm,
            ...adaptDataForEditGroupForm(data),
        },
        enableReinitialize: true,
        validationSchema: $CreateGroupRequest,
        onSubmit: (values, { setFieldError }) => {
            updateGroup.mutate(values, {
                onSuccess: (response) => {
                    router.push({ pathname: "/admin/groups/[id]", query: { id: String(response.id) } });
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
            <Flex align="center" gap={16}>
                <Title order={1} color="dark">
                    {data?.name}
                </Title>
                <Badge variant="outline" className={classes.status}>
                    {renderStatus}
                </Badge>
            </Flex>
            <Form config={config}>
                {({ values }) => (
                    <>
                        <Flex mt={24} gap={32} align="center">
                            <Box className={classes.infoItem}>
                                ID: <span>{data?.id}</span>
                            </Box>
                            <Flex gap={8}>
                                <Text className={classes.infoItem}>Статус:</Text>
                                <FSwitch
                                    name="isActive"
                                    variant="secondary"
                                    label={values.isActive ? "Деактивировать" : "Активировать"}
                                    labelPosition="left"
                                />
                            </Flex>
                            <Box className={classes.infoItem}>
                                Учебный курс: <span>{data?.courseName || "-"}</span>
                            </Box>
                            <Box className={classes.infoItem}>
                                Создание: <span>{data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                            </Box>
                        </Flex>
                        {/* TODO: Этот функционал нужно добавить когда будет эндпоинт для получения курсов */}
                        {/* <Fieldset mt={32} label="Направление обучения" icon={<Flag />}>
                            <Box>
                                <FSelect
                                    name="courseName"
                                    size="sm"
                                    data={rolesSelectOption ?? []}
                                    clearable
                                    label="Роль"
                                    disabled={userFilters.isLoading}
                                />
                            </Box>
                        </Fieldset> */}
                        <Fieldset mt={32} label="Данные группы" icon={<FolderPlus />} maw={512}>
                            <Grid>
                                <Grid.Col>
                                    <FInput label="Название группы" name="name" size="sm" />
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <FDateRangePicker
                                        name="educationFrom"
                                        nameTo="educationTo"
                                        label="Даты обучения"
                                        allowLevelChange={false}
                                        size="sm"
                                    />
                                </Grid.Col>
                                <Grid.Col xs={6}>
                                    <FInput label="Учеников в группе(max)" name="maxStudents" type="number" size="sm" />
                                </Grid.Col>
                            </Grid>
                        </Fieldset>
                        <Box component="fieldset" className={classes.fieldset} mt={32} maw={512}>
                            <Box component="legend" className={classes.legend}>
                                <User />
                                <Text className={classes.title}>Преподаватель группы</Text>
                                <Switch variant="secondary" checked={showTeachersSelect} onChange={handleChangeSwitch} />
                            </Box>
                            {/* TODO: Этот функционал нужно добавить когжда будет эндпоинт для получения учителей */}
                            {/* {showTeachersSelect && (
                        <FSelect name="teacherId" size="sm" data={[]} clearable label="Закрепленные преподаватели" w="100%" />
                    )} */}
                        </Box>
                        <Flex mt={32} gap={8}>
                            <Button variant="border" size="large" onClick={onClose}>
                                Отмена
                            </Button>
                            <Button type="submit" variant="secondary" size="large">
                                Сохранить
                            </Button>
                        </Flex>
                    </>
                )}
            </Form>
        </Box>
    );
};

export default EditGroupForm;
