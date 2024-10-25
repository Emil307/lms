import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { Shield, User } from "react-feather";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { closeModal, openModal } from "@mantine/modals";
import { Button, FAvatarInput, FControlButtons, FInput, FPhoneInput, FSwitch, LastUpdatedInfo, ManagedForm, Paragraph } from "@shared/ui";
import { UpdateAdminUserResponse, useAdminStudentsFilters, userApi, UserDetailResponse } from "@entities/user";
import { Fieldset } from "@components/Fieldset";
import { ToastType, createNotification, getFullName } from "@shared/utils";
import { ChangeUserPasswordForm } from "@features/users";
import { EntityNames, MutationKeys } from "@shared/constant";
import { Roles } from "@shared/types";
import { initialValues } from "./constants";
import { $UpdateStudentFormValidation, UpdateStudentFormValidation } from "./types";
import useStyles from "./UpdateStudentForm.styles";
import { adaptDataUpdateStudentForm, adaptUpdateStudentRequest } from "./utils";

export interface UpdateStudentFormProps extends Omit<BoxProps, "children"> {
    data?: UserDetailResponse;
    onClose: () => void;
}

const UpdateStudentForm = ({ data, onClose, ...props }: UpdateStudentFormProps) => {
    const router = useRouter();
    const { classes } = useStyles();

    const { data: studentFilters } = useAdminStudentsFilters();

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
        return userApi.updateUser({
            ...adaptUpdateStudentRequest(values),
            id: String(data?.id),
            roleId: studentFilters?.roles.find((role) => role.name === Roles.student)?.id!,
        });
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
        <Box {...props}>
            <ManagedForm<UpdateStudentFormValidation, UpdateAdminUserResponse>
                initialValues={{ ...initialValues, ...adaptDataUpdateStudentForm(data) }}
                validationSchema={$UpdateStudentFormValidation}
                mutationKey={[MutationKeys.UPDATE_USER, String(data?.id)]}
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.STUDENT }}
                mutationFunction={updateStudent}
                onSuccess={onSuccess}
                onError={onError}
                onCancel={onClose}>
                {({ values, onCancel }) => (
                    <Flex direction="column" gap={32}>
                        <Flex className={classes.infoPanel}>
                            <Flex gap={8}>
                                <Paragraph variant="text-small-m" color="neutralMain50">
                                    ID:
                                </Paragraph>
                                <Paragraph variant="text-small-m">{data?.id}</Paragraph>
                            </Flex>
                            <Flex align="center" gap={8}>
                                <Paragraph variant="text-small-m" color="neutralMain50">
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
                                <Paragraph variant="text-small-m" color="neutralMain50">
                                    Последний вход:
                                </Paragraph>
                                <Paragraph variant="text-small-m">
                                    {data?.lastLoginAt ? dayjs(data.lastLoginAt).format("DD.MM.YYYY HH:mm") : "-"}
                                </Paragraph>
                            </Flex>
                            <LastUpdatedInfo data={data?.lastUpdated} />
                        </Flex>

                        <Fieldset label="Личные данные" icon={<User />} showDivider={false} maw={772}>
                            <FAvatarInput
                                name="avatar"
                                label="Загрузить аватар"
                                description="Рекомендуемый размер изображения: 1024х1024 px, до 500Kb"
                            />
                            <Flex gap={8} wrap="wrap" mt={24} maw={772}>
                                <FInput name="firstName" label="Имя" onlyLetters size="sm" className={classes.formInput} withAsterisk />
                                <FInput name="lastName" label="Фамилия" onlyLetters size="sm" className={classes.formInput} withAsterisk />
                                <FInput name="patronymic" label="Отчество" onlyLetters size="sm" className={classes.formInput} />
                                <FPhoneInput name="phone" label="Телефон" size="sm" className={classes.formInput} withAsterisk />
                            </Flex>
                        </Fieldset>
                        <Fieldset label="Системные данные" icon={<Shield />}>
                            <Flex direction="column" gap={16} w="100%">
                                <Flex wrap="wrap" gap={8}>
                                    <FInput name="email" label="Email" size="sm" miw={{ base: "100%", xs: 252 }} disabled />
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
                        <FControlButtons onClose={onCancel} />
                    </Flex>
                )}
            </ManagedForm>
        </Box>
    );
};

export default UpdateStudentForm;
