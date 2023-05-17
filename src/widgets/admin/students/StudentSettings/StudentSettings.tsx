import { Box, Flex, Group, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { Shield, Trash, User as UserIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { ProfileInfo } from "@components/ProfileInfo";
import { useDetailUser } from "@entities/user";
import { ChangeUserPasswordForm, UserDeleteModal } from "@features/users";
import { getFullNameFromProfile } from "@shared/utils";
import { useSettingUserStyles } from "./StudentSettings.styles";
import { fields } from "./constants";

interface StudentSettingsProps {
    id: string;
}

const StudentSettings = ({ id }: StudentSettingsProps) => {
    const router = useRouter();
    const { classes } = useSettingUserStyles();
    const { data } = useDetailUser(id);

    const dataProfile = {
        fio: getFullNameFromProfile(data?.profile),
        roleName: data?.roles[0].displayName ?? "",
        email: data?.email ?? "",
    };

    const openModalDeleteUser = () => {
        openModal({
            modalId: `${id}`,
            title: "Удаление пользователя",
            centered: true,
            children: <UserDeleteModal redirectUrl="/admin/students" id={id} fio={getFullNameFromProfile(data?.profile)} />,
        });
    };

    const openUserEditPage = () => router.push({ pathname: "/admin/students/[id]/edit", query: { id } });

    const handleCloseChangePasswordModal = () => closeModal("CHANGE_PASSWORD");

    const handleOpenChangePasswordModal = () =>
        openModal({
            modalId: "CHANGE_PASSWORD",
            title: "Изменение пароля",
            centered: true,
            size: 408,
            children: (
                <ChangeUserPasswordForm
                    userData={{ id: data?.id, roleId: data?.roles[0].id, fio: dataProfile.fio }}
                    onClose={handleCloseChangePasswordModal}
                />
            ),
        });

    return (
        <Box>
            <Box mt={32} className={classes.info}>
                <Group sx={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <Flex gap={48} align="center">
                        <Title order={2}>Настройки пользователя</Title>
                        <Button
                            onClick={openModalDeleteUser}
                            variant="text"
                            leftIcon={
                                <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                                    <Trash />
                                </ThemeIcon>
                            }>
                            Удалить пользователя
                        </Button>
                    </Flex>
                    <Fieldset mt={32} label="Личные данные" icon={<UserIcon />}>
                        <DisplayField label="Фамилия" value={data?.profile.lastName} />
                        <DisplayField label="Имя" value={data?.profile.firstName} />
                        <DisplayField label="Отчество" value={data?.profile.patronymic} />
                    </Fieldset>

                    <Fieldset mt={24} label="Системные данные" icon={<Shield />}>
                        <DisplayField label="Роль" value={data?.roles[0].displayName} />
                        <DisplayField label="Email" value={data?.email} />
                    </Fieldset>

                    {/* TODO: - уведомления еще не реализованы */}
                </Group>
                <Box>
                    <ProfileInfo
                        avatarSrc={data?.profile.avatar?.absolutePath ?? ""}
                        values={dataProfile}
                        variant="whiteBg"
                        fields={fields}
                        actionSlot={
                            <>
                                <Button variant="secondary" onClick={openUserEditPage}>
                                    Редактировать данные
                                </Button>
                                <Button variant="border" onClick={handleOpenChangePasswordModal}>
                                    Изменить пароль
                                </Button>
                            </>
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default StudentSettings;
