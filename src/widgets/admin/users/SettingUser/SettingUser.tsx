import { Box, Flex, Group, ThemeIcon, Title, Image, Text } from "@mantine/core";
import React from "react";
import { Info, Shield, Trash, User, UserCheck } from "react-feather";
import { openModal } from "@mantine/modals";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { ProfileInfo, ProfileInfoDisplayFields } from "@components/ProfileInfo";
import { useDetailUser } from "@entities/user";
import { UserDeleteModal } from "@features/users";
import { useSettingUserStyles } from "./SettingUser.styles";

interface ProfileUser {
    fio: string;
    roleName: string;
    email: string;
}

const fields: ProfileInfoDisplayFields<ProfileUser> = [
    { name: "fio", label: "Фио" },
    { name: "roleName", label: "Роль" },
    { name: "email", label: "Email" },
];

interface SettingUserProps {
    id: string;
}

const SettingUser = ({ id }: SettingUserProps) => {
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
                <UserDeleteModal redirectUrl="/admin/users" id={id} fio={`${data?.firstName} ${data?.patronymic} ${data?.lastName}`} />
            ),
        });
    };

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
                    <Fieldset mt={32} label="Личные данные" icon={<User />}>
                        <DisplayField label="Фамилия" value={data?.lastName} />
                        <DisplayField label="Имя" value={data?.firstName} />
                        <DisplayField label="Отчество" value={data?.patronymic} />
                    </Fieldset>

                    <Fieldset mt={24} label="Системные данные" icon={<Shield />}>
                        <DisplayField label="Роль" value={data?.roleName} />
                        <DisplayField label="Email" value={data?.email} />
                    </Fieldset>

                    <Fieldset mt={24} label="О преподавателе" icon={<UserCheck />}>
                        <Box sx={{ width: 376 }}>
                            {/* TODO - нужно поле с бэка */}
                            <Image
                                radius="lg"
                                src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                                alt="User"
                            />
                            <Flex mt={4} gap={4} align="center">
                                <ThemeIcon size={16} color="primaryHover" variant="outline" sx={{ border: "none" }}>
                                    <Info />
                                </ThemeIcon>
                                <Text>Рекомендуемый размер изображения: 376х220 px</Text>
                            </Flex>
                        </Box>
                    </Fieldset>
                    <Box className={classes.desc} mt={16}>
                        {data?.description}
                    </Box>
                    {/* TODO - уведомления еще не реализованы */}
                </Group>
                <Box>
                    <ProfileInfo
                        avatarSrc={data?.avatarUrl}
                        values={dataProfile}
                        variant="whiteBg"
                        fields={fields}
                        actionSlot={
                            <>
                                <Button variant="secondary">Редактировать данные</Button>
                                <Button variant="border">Изменить пароль</Button>
                            </>
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default SettingUser;
