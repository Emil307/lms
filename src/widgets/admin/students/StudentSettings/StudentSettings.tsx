import { Box, Flex, Group } from "@mantine/core";
import React from "react";
import { Shield, Trash, User as UserIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading } from "@shared/ui";
import { useDetailUser } from "@entities/user";
import { ChangeUserPasswordForm, UserDeleteModal } from "@features/users";
import { getFullName } from "@shared/utils";
import { InfoCard } from "@components/InfoCard";
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
        fio: getFullName({ data: data?.profile }),
        roleName: data?.roles[0].displayName ?? "",
        email: data?.email ?? "",
    };

    const openModalDeleteUser = () => {
        openModal({
            modalId: `${id}`,
            title: "Удаление пользователя",
            centered: true,
            children: <UserDeleteModal redirectUrl="/admin/students" id={id} fio={getFullName({ data: data?.profile })} />,
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
                        <Heading order={2}>Настройки пользователя</Heading>
                        <Button onClick={openModalDeleteUser} variant="text" leftIcon={<Trash />}>
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
                    <InfoCard
                        avatar={{
                            src: data?.profile.avatar?.absolutePath,
                        }}
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
