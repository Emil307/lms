import { Box, Flex, Group, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { Shield, Trash, User as UserIcon } from "react-feather";
import { openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { ProfileInfo } from "@components/ProfileInfo";
import { useDetailUser } from "@entities/user";
import { UserDeleteModal } from "@features/users";
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
        fio: `${data?.firstName} ${data?.patronymic} ${data?.lastName}`,
        roleName: data?.roleName ?? "",
        email: data?.email ?? "",
    };

    const openModalDeleteUser = () => {
        openModal({
            modalId: `${id}`,
            title: "Удаление пользователя",
            centered: true,
            children: (
                <UserDeleteModal redirectUrl="/admin/students" id={id} fio={`${data?.firstName} ${data?.patronymic} ${data?.lastName}`} />
            ),
        });
    };

    const openUserEditPage = () => router.push({ pathname: "/admin/students/[id]/edit", query: { id } });

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
                        <DisplayField label="Фамилия" value={data?.lastName} />
                        <DisplayField label="Имя" value={data?.firstName} />
                        <DisplayField label="Отчество" value={data?.patronymic} />
                    </Fieldset>

                    <Fieldset mt={24} label="Системные данные" icon={<Shield />}>
                        <DisplayField label="Роль" value={data?.roleName} />
                        <DisplayField label="Email" value={data?.email} />
                    </Fieldset>

                    {/* TODO - уведомления еще не реализованы */}
                </Group>
                <Box>
                    <ProfileInfo
                        avatarSrc={data?.avatarUrl ?? ""}
                        values={dataProfile}
                        variant="whiteBg"
                        fields={fields}
                        actionSlot={
                            <>
                                <Button variant="secondary" onClick={openUserEditPage}>
                                    Редактировать данные
                                </Button>
                                {/* TODO: Когда будет эндпоинт для этого подключить модальное окно */}
                                <Button variant="border">Изменить пароль</Button>
                            </>
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default StudentSettings;