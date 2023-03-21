import { Box, Flex, Group, ThemeIcon, Title, Image, Text } from "@mantine/core";
import React from "react";
import { Bell, Info, Shield, Trash, User, UserCheck } from "react-feather";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { ControlPanel, ProfileInfo, ProfileInfoDisplayFields } from "@components/index";
import { GetMeResponse } from "@entities/auth";
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
            <Box mt={32} className={classes.info}>
                <Group sx={() => ({ flexDirection: "column", alignItems: "flex-start", gap: 24 })}>
                    <Fieldset label="Личные данные" icon={<User />}>
                        <DisplayField label="Фамилия" value="Смирнова" />
                        <DisplayField label="Имя" value="Екатерина" />
                        <DisplayField label="Отчество" value="Владимировна" />
                    </Fieldset>

                    <Fieldset label="Системные данные" icon={<Shield />}>
                        <DisplayField label="Роль" value="Ученик" />
                        <DisplayField label="Email" value="admim@admin.com" />
                    </Fieldset>

                    <Fieldset label="О преподавателе" icon={<UserCheck />}>
                        <Box style={{ width: 376 }}>
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
                    <Box>
                        Екатерина Владимировна постоянно повышает свою квалификацию через самообразование, активную работу в методических
                        объединениях, на курсах Галерея Бизнеса. По итогам аттестации __года Екатерина Владимировна присвоена высшая
                        (первая) квалификационная категория по должности учитель.
                    </Box>
                    <Fieldset label="Настройки уведомлений" icon={<Bell />}>
                        <Box className={classes.settingsNotification} w="100%">
                            <ControlPanel label="Уведомлять о домашних заданиях требующих проверки" variant="secondary" />
                            <ControlPanel label="Уведомлять о новых сообщениях в чате поддержки" variant="secondary" />
                        </Box>
                    </Fieldset>
                </Group>
                <Box>
                    {/* TODO - API */}
                    <ProfileInfo
                        variant="admin"
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
