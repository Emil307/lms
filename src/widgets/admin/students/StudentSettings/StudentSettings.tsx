import { Box, BoxProps, Flex } from "@mantine/core";
import React from "react";
import { Bell, Shield, User as UserIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading } from "@shared/ui";
import { useDetailsStudent } from "@entities/user";
import { ChangeUserPasswordForm } from "@features/users";
import { getFullName, getPhoneNumberWithMask } from "@shared/utils";
import { InfoCard } from "@components/InfoCard";
import { SettingsList as SettingsNotificationList } from "@widgets/notifications";
import { useUpdateAdminUserNotification } from "@entities/notification";
import { Roles } from "@app/routes";
import { useUserRole } from "@entities/auth/hooks";
import { fields } from "./constants";
import useStyles from "./StudentSettings.styles";
import { DeleteStudentButton } from "./components";

export interface StudentSettingsProps extends BoxProps {
    id: string;
}

const StudentSettings = ({ id, ...props }: StudentSettingsProps) => {
    const router = useRouter();
    const { classes, cx } = useStyles();
    const { data } = useDetailsStudent(id);

    const userRole = useUserRole();

    const { mutate: updateNotification } = useUpdateAdminUserNotification(id);

    const dataProfile = {
        fio: getFullName({ data: data?.profile }),
        roleName: data?.roles[0].displayName ?? "",
        email: data?.email ?? "",
    };

    const handleChangeNotification = (notification: string, isActive: boolean) => {
        updateNotification({ notification, isActive });
    };

    const openUserEditPage = () => router.push({ pathname: "/admin/students/[id]/edit", query: { id } });

    const handleCloseChangePasswordModal = () => closeModal("CHANGE_PASSWORD");

    const handleOpenChangePasswordModal = () =>
        openModal({
            modalId: "CHANGE_PASSWORD",
            title: "Изменение пароля",
            size: 408,
            children: (
                <ChangeUserPasswordForm
                    userData={{ id: data?.id, roleId: data?.roles[0].id, fio: dataProfile.fio }}
                    onClose={handleCloseChangePasswordModal}
                />
            ),
        });

    const renderInfoCardActions = () => {
        if (userRole === Roles.teacher) {
            return null;
        }
        return (
            <>
                <Button variant="secondary" onClick={openUserEditPage}>
                    Редактировать данные
                </Button>
                <Button variant="border" onClick={handleOpenChangePasswordModal}>
                    Изменить пароль
                </Button>
            </>
        );
    };

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Flex className={classes.settingsInfo}>
                <Flex className={classes.headingSettingsInfo}>
                    <Heading order={2}>Настройки пользователя</Heading>
                    <DeleteStudentButton data={data} hidden={userRole === Roles.teacher} />
                </Flex>
                <Fieldset label="Личные данные" icon={<UserIcon />}>
                    <DisplayField label="Фамилия" value={data?.profile.lastName} />
                    <DisplayField label="Имя" value={data?.profile.firstName} />
                    <DisplayField label="Отчество" value={data?.profile.patronymic} />
                    {(data?.roles[0].id === Roles.student || data?.roles[0].id === Roles.employee) &&
                        <DisplayField label="Телефон" value={getPhoneNumberWithMask({ phoneNumber: data.phone })} />
                    }
                </Fieldset>

                <Fieldset label="Системные данные" icon={<Shield />}>
                    <DisplayField label="Роль" value={data?.roles[0].displayName} />
                    <DisplayField label="Email" value={data?.email} />
                </Fieldset>

                {userRole !== Roles.teacher && (
                    <Fieldset label="Настройки уведомлений" icon={<Bell />}>
                        <SettingsNotificationList
                            notifications={data?.notifications}
                            variant="secondary"
                            onChange={handleChangeNotification}
                        />
                    </Fieldset>
                )}
            </Flex>
            <Box>
                <InfoCard
                    avatar={{
                        src: data?.profile.avatar?.absolutePath,
                    }}
                    values={dataProfile}
                    variant="whiteBg"
                    fields={fields}
                    actionSlot={renderInfoCardActions()}
                />
            </Box>
        </Flex>
    );
};

export default StudentSettings;
