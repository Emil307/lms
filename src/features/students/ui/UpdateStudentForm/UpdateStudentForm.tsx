import { Box, Flex, Avatar } from "@mantine/core";
import React from "react";
import { Edit3, Shield, User } from "react-feather";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { closeModal, openModal } from "@mantine/modals";
import { Button, FFileButton, FInput, FRadioGroup, FSwitch, LastUpdatedInfo, ManagedForm, Paragraph, Radio } from "@shared/ui";
import { UpdateAdminUserResponse, useAdminStudentsFilters, userApi, UserDetailResponse } from "@entities/user";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { ToastType, createNotification, getFullName } from "@shared/utils";
import { ChangeUserPasswordForm } from "@features/users";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { getInitialValuesForm } from "./constants";
import { $UpdateStudentFormValidation, UpdateStudentFormValidation } from "./types";
import { adaptDataUpdateStudentForm, adaptUpdateStudentRequest } from "./utils";

export interface UpdateStudentFormProps {
    data?: UserDetailResponse;
    onClose: () => void;
}

const UpdateStudentForm = ({ data, onClose }: UpdateStudentFormProps) => {
    const router = useRouter();
    const { data: options } = useAdminStudentsFilters();

    const currentRole = String(options?.roles.find((role) => role.id === data?.roles[0].id)?.id);

    const handleCloseChangePasswordModal = () => closeModal("CHANGE_PASSWORD");

    const handleOpenChangePasswordModal = () => {
        openModal({
            modalId: "CHANGE_PASSWORD",
            title: "Изменение пароля",
            size: 408,
            children: (
                <ChangeUserPasswordForm
                    userData={{ id: data?.id, roleId: data?.roles[0].id, fio: getFullName({ data: data?.profile }) }}
                    onClose={handleCloseChangePasswordModal}
                />
            ),
        });
    };

    const updateStudent = (values: UpdateStudentFormValidation) => {
        return userApi.updateUser({ ...adaptUpdateStudentRequest(values), id: String(data?.id) });
    };

    const onSuccess = (response: UserDetailResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены",
        });
        router.push({ pathname: "/admin/students/[id]", query: { id: response.id.toString() } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления ученика",
        });
    };

    return (
        <Box>
            <ManagedForm<UpdateStudentFormValidation, UpdateAdminUserResponse>
                initialValues={{ ...getInitialValuesForm(currentRole), ...adaptDataUpdateStudentForm(data) }}
                validationSchema={$UpdateStudentFormValidation}
                mutationKey={[MutationKeys.UPDATE_USER, String(data?.id)]}
                keysInvalidateQueries={[
                    { queryKey: [QueryKeys.GET_ADMIN_USER, String(data?.id)] },
                    { queryKey: [QueryKeys.GET_ADMIN_STUDENTS] },
                    { queryKey: [QueryKeys.GET_ADMIN_USERS] },
                ]}
                mutationFunction={updateStudent}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}
                hasConfirmModal>
                {({ values, dirty, onCancel }) => (
                    <Flex direction="column" gap={32}>
                        <Flex gap={32} align="center">
                            <Flex gap={8}>
                                <Paragraph variant="text-small-m" color="gray45">
                                    ID:
                                </Paragraph>
                                <Paragraph variant="text-small-m">{data?.id}</Paragraph>
                            </Flex>
                            <Flex gap={8}>
                                <Paragraph variant="text-small-m" color="gray45">
                                    Статус:
                                </Paragraph>
                                <FSwitch
                                    name="isActive"
                                    variant="secondary"
                                    label={values.isActive ? "Деактивировать" : "Активировать"}
                                    labelPosition="left"
                                />
                            </Flex>
                            <Flex gap={8}>
                                <Paragraph variant="text-small-m" color="gray45">
                                    Последний вход:
                                </Paragraph>
                                <Paragraph variant="text-small-m">
                                    {data?.lastLoginAt ? dayjs(data.lastLoginAt).format("DD.MM.YYYY HH:mm") : "-"}
                                </Paragraph>
                            </Flex>
                            <LastUpdatedInfo data={data?.lastUpdated} />
                        </Flex>

                        <Fieldset label="Личные данные" icon={<User />}>
                            <>
                                <Flex align="center" gap={24}>
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
                            <Flex direction="column" gap={16} w="100%">
                                <FRadioGroup name="roleId">
                                    {options?.roles.map((item) => (
                                        <Radio size="md" key={item.id} label={item.displayName} value={String(item.id)} />
                                    ))}
                                </FRadioGroup>
                                <Flex wrap="wrap" gap={8}>
                                    <FInput name="email" label="Email" size="sm" w={252} disabled />
                                    <Button
                                        type="button"
                                        variant="border"
                                        size="medium"
                                        w="100%"
                                        maw={252}
                                        onClick={handleOpenChangePasswordModal}>
                                        Изменить пароль
                                    </Button>
                                </Flex>
                            </Flex>
                        </Fieldset>

                        <Flex gap={8}>
                            <Button variant="border" size="large" onClick={onCancel} w="100%" maw={252}>
                                Отменить
                            </Button>
                            <Button type="submit" variant="secondary" size="large" w="100%" maw={252} disabled={!dirty}>
                                Сохранить
                            </Button>
                        </Flex>
                    </Flex>
                )}
            </ManagedForm>
        </Box>
    );
};

export default UpdateStudentForm;
