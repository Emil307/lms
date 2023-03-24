import { Box, Title, Text, Flex, Avatar } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import { useMantineTheme } from "@mantine/core";
import { Edit3, Shield, User, UserCheck } from "react-feather";
import axios from "axios";
import { Button, FFileButton, FInput, Form, FSwitch } from "@shared/ui";
import { $userCreate, useCreateUser, UserCreateRequest } from "@entities/user";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { FTextArea } from "@shared/ui/Forms/TextArea";

const CreateUser = () => {
    const theme = useMantineTheme();

    const createUser = useCreateUser();

    const config: FormikConfig<UserCreateRequest> = {
        initialValues: {
            email: "",
            password: "",
            passwordConfirmation: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            description: "",
            isActive: false,
            // TODO - роль, ждем бэк
            // roleName: "employee",
            // avatar: "",
        },
        validationSchema: $userCreate,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await createUser.mutateAsync(values);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    for (const errorField in error.response?.data.errors) {
                        setFieldError(errorField, error.response?.data.errors[errorField][0]);
                    }
                }
            }
        },
    };
    return (
        <Box>
            <Form config={config}>
                {/* {({ values }) => ( */}
                    <>
                        <Title order={1}>Создание пользователя</Title>
                        <Flex gap={8} mt={24} align="center">
                            <Text
                                sx={{
                                    color: theme.colors.gray45[0],
                                }}>
                                Статус:
                            </Text>
                            <FSwitch labelPosition="left" variant="secondary" name="isActive" label="Активировать" />
                        </Flex>
                        <Fieldset mt={32} label="Личные данные" icon={<User />}>
                            <Box>
                                {/* TODO -  */}
                                <Flex gap={24}>
                                    <Avatar
                                        // src={values.avatar ? URL.createObjectURL(values.avatar) : null}
                                        alt="avatar"
                                        w={84}
                                        h={84}
                                        radius={50}>
                                        <AvatarIcon />
                                    </Avatar>
                                    <FFileButton name="avatar" label="Изменить аватар" buttonProps={{ leftIcon: <Edit3 /> }} />
                                </Flex>
                                <Flex mt={24} gap={8}>
                                    <FInput name="firstName" label="Имя" size="sm" w={252} withAsterisk />
                                    <FInput name="lastName" label="Фамилия" size="sm" w={252} withAsterisk />
                                    <FInput name="patronymic" label="Отчество" size="sm" w={252} />
                                </Flex>
                            </Box>
                        </Fieldset>
                        <Fieldset mt={32} label="Системные данные" icon={<Shield />}>
                            <Box>
                                {/* TODO - подождать от бэка */}
                                {/* <FRadioGroup name="isActive" defaultValue="">
                                    {radioGroupValues.map((item) => {
                                        return <Radio size="md" key={item.id} label={item.label} value={item.value} />;
                                    })}
                                </FRadioGroup> */}
                                <Flex mt={24} gap={8}>
                                    <FInput name="email" label="Email" size="sm" w={252} withAsterisk />
                                    <FInput name="password" label="Пароль" size="sm" w={252} withAsterisk />
                                    <FInput name="passwordConfirmation" label="Повторите пароль" size="sm" w={252} withAsterisk />
                                </Flex>
                            </Box>
                        </Fieldset>
                        <Fieldset mt={24} label="О преподавателе" icon={<UserCheck />}>
                            {/* TODO - компонент еще в работе, бэк в работе */}
                            <FTextArea w={600} autosize minRows={4} name="description" />
                        </Fieldset>
                        {/* TODO - нотификация в разработке на бэке, как появится добавить */}
                        <Button mt={100} type="submit" variant="secondary" size="large">
                            Сохранить
                        </Button>
                    </>
                {/* )} */}
            </Form>
        </Box>
    );
};

export default CreateUser;
