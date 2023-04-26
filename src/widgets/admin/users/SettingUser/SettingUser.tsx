import { Box, Flex, Group, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { Shield, Trash, User as UserIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { ProfileInfo } from "@components/ProfileInfo";
import { useDetailUser } from "@entities/user";
import { ChangePasswordForm, UserDeleteModal } from "@features/users";
import { useSettingUserStyles } from "./SettingUser.styles";
import { getFullNameFromProfile } from "@shared/utils";
import { fields } from "./constants";

interface SettingUserProps {
    id: string;
}

const SettingUser = ({ id }: SettingUserProps) => {
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
            children: <UserDeleteModal redirectUrl="/admin/users" id={id} fio={getFullNameFromProfile(data?.profile)} />,
        });
    };

    const handleCloseChangePasswordModal = () => closeModal("CHANGE_PASSWORD");

    const handleOpenChangePasswordModal = () =>
        openModal({
            modalId: "CHANGE_PASSWORD",
            title: "Изменение пароля",
            centered: true,
            size: 408,
            children: <ChangePasswordForm onClose={handleCloseChangePasswordModal} />,
        });

    const openEditUserPage = () => router.push({ pathname: "/admin/users/[id]/edit", query: { id } });

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

                    {/*TODO: Расскоментить, когда добавят image для препода*/}
                    {/*{data?.additionalImageUrl && (*/}
                    {/*    <Fieldset mt={24} label="О преподавателе" icon={<UserCheck />}>*/}
                    {/*        <Box sx={{ width: 376 }}>*/}
                    {/*            <Image radius="lg" src={data.additionalImageUrl} alt="User" />*/}
                    {/*            <Flex mt={4} gap={4} align="center">*/}
                    {/*                <ThemeIcon size={16} color="primaryHover" variant="outline" sx={{ border: "none" }}>*/}
                    {/*                    <Info />*/}
                    {/*                </ThemeIcon>*/}
                    {/*                <Text>Рекомендуемый размер изображения: 376х220 px</Text>*/}
                    {/*            </Flex>*/}
                    {/*        </Box>*/}
                    {/*    </Fieldset>*/}
                    {/*)}*/}

                    <Box className={classes.desc} mt={16}>
                        {data?.profile.description}
                    </Box>
                    {/* TODO - уведомления еще не реализованы */}
                </Group>
                <Box>
                    <ProfileInfo
                        avatarSrc={data?.profile.avatar?.absolutePath ?? ""}
                        values={dataProfile}
                        variant="whiteBg"
                        fields={fields}
                        actionSlot={
                            <>
                                <Button variant="secondary" onClick={openEditUserPage}>
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

export default SettingUser;
