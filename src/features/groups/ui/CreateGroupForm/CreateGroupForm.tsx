import { Box, Text, Flex, Grid } from "@mantine/core";
import { FormikConfig } from "formik";
import React, { ChangeEvent, useCallback, useState } from "react";
import { FolderPlus, User } from "react-feather";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, FDateRangePicker, FInput, Form, FSwitch, Switch } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { $createGroupRequest, CreateGroupRequest, useCreateGroup } from "@entities/group";
import { initialValuesCreateGroupForm } from "@features/groups";
import useStyles from "./CreateGroupForm.styles";

const CreateGroupForm = () => {
    const { classes } = useStyles();
    const [showTeachersSelect, setShowTeachersSelect] = useState(false);
    const router = useRouter();

    const createGroup = useCreateGroup();

    const handlerCancel = () => {
        router.push("/admin/groups");
    };

    const handleChangeSwitch = useCallback((newValue: ChangeEvent<HTMLInputElement>) => setShowTeachersSelect(newValue.target.checked), []);

    const config: FormikConfig<CreateGroupRequest> = {
        initialValues: initialValuesCreateGroupForm,
        enableReinitialize: true,
        validationSchema: $createGroupRequest,
        onSubmit: (values, { setFieldError }) => {
            createGroup.mutate(values, {
                onSuccess: (response) => {
                    router.push({ pathname: "/admin/groups/[id]", query: { id: String(response.data.id) } });
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
        <Form config={config}>
            <Flex gap={8} mt={24} align="center">
                <Text
                    sx={(theme) => ({
                        color: theme.colors.gray45[0],
                    })}>
                    Статус:
                </Text>
                <FSwitch labelPosition="left" variant="secondary" name="isActive" label="Активировать" />
            </Flex>
            {/* TODO: Этот функционал нужно добавить когжда будет эндпоинт для получения курсов */}
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
                <Button variant="border" size="large" onClick={handlerCancel}>
                    Отмена
                </Button>
                <Button type="submit" variant="secondary" size="large">
                    Сохранить
                </Button>
            </Flex>
        </Form>
    );
};

export default CreateGroupForm;
