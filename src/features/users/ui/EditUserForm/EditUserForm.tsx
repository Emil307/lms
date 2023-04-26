import { Box, Text, Flex, Avatar } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import { Edit3, Shield, User, UserCheck } from "react-feather";
import axios from "axios";
import { useRouter } from "next/router";
import { closeModal, openModal } from "@mantine/modals";
import { Button, FFileButton, FFileInput, FInput, Form, FRadioGroup, FSwitch, FTextarea, Radio } from "@shared/ui";
import { $updateUserRequest, UpdateUserRequest, useAdminUsersFilters, UserDetailResponse, useUpdateUser } from "@entities/user";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { ChangePasswordForm } from "@features/users";
import { getInitialValuesForm } from "./constants";
import useStyles from "./EditUserForm.styles";
import { adaptDataForEditForm } from "./utils";

export interface EditUserFormProps {
    data?: UserDetailResponse;
    onClose: () => void;
}

const EditUserForm = ({ data, onClose }: EditUserFormProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const { data: options } = useAdminUsersFilters();
    const updateUser = useUpdateUser(String(data?.id));

    const currentRole = String(options?.roles.find((role) => role.id === data?.roles[0].id)?.id);

    const handleCloseChangePasswordModal = () => closeModal("CHANGE_PASSWORD");

    const handleOpenChangePasswordModal = () => {
        openModal({
            modalId: "CHANGE_PASSWORD",
            title: "Изменение пароля",
            centered: true,
            size: 408,
            children: <ChangePasswordForm onClose={handleCloseChangePasswordModal} />,
        });
    };

    const config: FormikConfig<UpdateUserRequest> = {
        initialValues: { ...getInitialValuesForm(currentRole), ...adaptDataForEditForm(data) },
        enableReinitialize: true,
        validationSchema: $updateUserRequest,
        onSubmit: (values, { setFieldError }) => {
            updateUser.mutate(
                { ...values, avatarId: values.avatar?.id, additionalImageId: values.additionalImage?.id },
                {
                    onSuccess: (response) => {
                        router.push({ pathname: "/admin/users/[id]", query: { id: String(response.id) } });
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
                                        src={values.avatar?.absolutePath || data?.profile.avatar?.absolutePath}
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
                                <Flex wrap="wrap" gap={8}>
                                    <FInput name="email" label="Email" size="sm" w={252} disabled />
                                    <Button type="button" variant="border" size="medium" onClick={handleOpenChangePasswordModal}>
                                        Изменить пароль
                                    </Button>
                                </Flex>
                            </Flex>
                        </Fieldset>
                        {options?.roles.find((item) => item.name === "teacher")?.id === Number(values.roleId) && (
                            <Fieldset label="О преподавателе" icon={<UserCheck />}>
                                <Flex direction="column" gap={24}>
                                    <FFileInput
                                        name="additionalImage"
                                        title="Загрузите файл"
                                        type="image"
                                        withDeleteButton
                                        h={220}
                                        w={376}
                                        description="Рекомендуемый размер изображения: 376х220 px"
                                    />
                                    <FTextarea w={772} autosize minRows={4} name="description" />
                                </Flex>
                            </Fieldset>
                        )}

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

export default EditUserForm;
