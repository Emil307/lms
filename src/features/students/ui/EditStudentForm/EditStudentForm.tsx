import { Box, Text, Flex, Avatar } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import { Edit3, Shield, User } from "react-feather";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, FFileButton, FInput, Form, FRadioGroup, FSwitch, Radio } from "@shared/ui";
import { $updateUserRequest, UpdateUserRequest, useAdminStudentsFilters, UserDetailResponse, useUpdateUser } from "@entities/user";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { getInitialValuesForm } from "./constants";
import useStyles from "./EditStudentForm.styles";
import { adaptDataForEditForm } from "./utils";

export interface EditStudentFormProps {
    data?: UserDetailResponse;
    onClose: () => void;
}

const EditStudentForm = ({ data, onClose }: EditStudentFormProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const { data: options } = useAdminStudentsFilters();
    const updateUser = useUpdateUser(String(data?.id));

    const currentRole = String(options?.roles.find((role) => role.id === data?.roleId)?.id);

    const config: FormikConfig<UpdateUserRequest> = {
        initialValues: { ...getInitialValuesForm(currentRole), ...adaptDataForEditForm(data) },
        enableReinitialize: true,
        validationSchema: $updateUserRequest,
        onSubmit: (values, { setFieldError }) => {
            updateUser.mutate(
                { ...values, avatarId: values.avatar?.id },
                {
                    onSuccess: (response) => {
                        router.push({ pathname: "/admin/students/[id]", query: { id: String(response.id) } });
                    },
                    onError: (error) => {
                        if (axios.isAxiosError(error)) {
                            for (const errorField in error.response?.data.errors) {
                                setFieldError(errorField, error.response?.data.errors[errorField][0]);
                            }
                        }
                    },
                }
            );
        },
    };
    return (
        <Box>
            <Form config={config}>
                {({ values, dirty }) => (
                    <Flex direction="column" gap={32}>
                        <Flex gap={32} align="center">
                            <Box className={classes.infoItem}>
                                ID: <span>{data?.id}</span>
                            </Box>
                            <Flex gap={8}>
                                <Text className={classes.infoItem}>Статус:</Text>
                                <FSwitch name="isActive" variant="secondary" label="Деактивировать" labelPosition="left" />
                            </Flex>

                            {/* TODO: Добавить Последний вход и последнее изменение когда будет сделано на беке */}
                        </Flex>

                        <Fieldset label="Личные данные" icon={<User />}>
                            <>
                                <Flex gap={24}>
                                    <Avatar
                                        src={values.avatar?.absolutePath || data?.avatarUrl}
                                        alt="avatar"
                                        w={84}
                                        h={84}
                                        radius={50}
                                        styles={(theme) => ({ placeholder: { backgroundColor: theme.colors.grayLight[0] } })}>
                                        <AvatarIcon />
                                    </Avatar>
                                    <FFileButton name="avatar" label="Загрузить аватар" buttonProps={{ leftIcon: <Edit3 /> }} />
                                </Flex>
                                <Flex mt={24} gap={8}>
                                    <FInput name="firstName" label="Имя" size="sm" w={252} withAsterisk />
                                    <FInput name="lastName" label="Фамилия" size="sm" w={252} withAsterisk />
                                    <FInput name="patronymic" label="Отчество" size="sm" w={252} />
                                </Flex>
                            </>
                        </Fieldset>
                        <Fieldset label="Системные данные" icon={<Shield />}>
                            <Flex direction="column" gap={16}>
                                <FRadioGroup name="roleId">
                                    {options?.roles.map((item) => {
                                        return <Radio size="md" key={item.id} label={item.displayName} value={String(item.id)} />;
                                    })}
                                </FRadioGroup>
                                <Button type="button" variant="border" size="large" w="100%" maw={252}>
                                    Изменить пароль
                                </Button>
                            </Flex>
                        </Fieldset>

                        {/* TODO: - нотификация в разработке на бэке, как появится -> добавить */}
                        <Flex gap={8}>
                            <Button variant="border" size="large" onClick={onClose} w="100%" maw={252}>
                                Отменить
                            </Button>
                            <Button type="submit" variant="secondary" size="large" w="100%" maw={252} disabled={!dirty}>
                                Сохранить
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </Form>
        </Box>
    );
};

export default EditStudentForm;
