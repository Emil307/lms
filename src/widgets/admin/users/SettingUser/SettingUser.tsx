import { Box, Flex, Group, ThemeIcon, Title, Image, Text } from "@mantine/core";
import React from "react";
import { Bell, Info, Shield, Trash, User, UserCheck } from "react-feather";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { GetMeResponse } from "@entities/auth";
import { ControlPanel } from "@components/Forms";
import { ProfileInfo, ProfileInfoDisplayFields } from "@components/ProfileInfo";
import { useSettingUserStyles } from "./SettingUser.styles";

const fields: ProfileInfoDisplayFields<GetMeResponse> = [
    { name: "profile.data.firstName", label: "Имя" },
    { name: "role.data.name", label: "Роль" },
    { name: "email", label: "Email" },
];

const SettingUser = () => {
    const { classes } = useSettingUserStyles();
    return (
        <Box mt={32}>
            <Box mt={32} className={classes.info}>
                <Group sx={{ flexDirection: "column", alignItems: "flex-start"}}>
                    <Flex gap={48} align="center">
                        <Title order={2}>Настройки пользователя</Title>
                        {/* TODO - при подключении апи перенести модалку с подключением в общий юай юзеров */}
                        <Button
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
                        <DisplayField key="family" label="Фамилия" value="Смирнова" />
                        <DisplayField key="name" label="Имя" value="Екатерина" />
                        <DisplayField key="secondName" label="Отчество" value="Владимировна" />
                    </Fieldset>

                    <Fieldset mt={24} label="Системные данные" icon={<Shield />}>
                        <DisplayField key="role" label="Роль" value="Ученик" />
                        <DisplayField key="email" label="Email" value="admim@admin.com" />
                    </Fieldset>

                    <Fieldset mt={24} label="О преподавателе" icon={<UserCheck />}>
                        <Box sx={{ width: 376 }}>
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
                        Екатерина Владимировна постоянно повышает свою квалификацию через самообразование, активную работу в методических
                        объединениях, на курсах Галерея Бизнеса. По итогам аттестации __года Екатерина Владимировна присвоена высшая
                        (первая) квалификационная категория по должности учитель.
                    </Box>
                    <Fieldset mt={24} label="Настройки уведомлений" icon={<Bell />}>
                        <Box key="box" className={classes.settingsNotification} w="100%">
                            <ControlPanel key="homeWork" label="Уведомлять о домашних заданиях требующих проверки" variant="secondary" />
                            <ControlPanel key="newMessage" label="Уведомлять о новых сообщениях в чате поддержки" variant="secondary" />
                        </Box>
                    </Fieldset>
                </Group>
                <Box>
                    {/* TODO - API */}
                    <ProfileInfo
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
