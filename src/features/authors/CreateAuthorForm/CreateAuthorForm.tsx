import { Box, Text, Flex, Avatar } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import { useMantineTheme } from "@mantine/core";
import { Edit3, User } from "react-feather";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, FFileButton, FInput, Form, FSwitch, FTextarea } from "@shared/ui";
import AvatarIcon from "@public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { $createAuthorRequest, CreateAuthorRequest, useCreateAuthor } from "@entities/author";
import UserDescriptionIcon from "@public/icons/userDescription.svg";
import { initialValues } from "./constants";

export interface CreateAuthorFormProps {
    onClose: () => void;
}

const CreateAuthorForm = ({ onClose }: CreateAuthorFormProps) => {
    const router = useRouter();
    const theme = useMantineTheme();

    const createAuthor = useCreateAuthor();

    const config: FormikConfig<CreateAuthorRequest> = {
        initialValues,
        enableReinitialize: true,
        validationSchema: $createAuthorRequest,
        onSubmit: (values, { setFieldError }) => {
            createAuthor.mutate(
                { ...values, avatarId: values.avatar?.id },
                {
                    onSuccess: (response) => {
                        router.push({ pathname: "/admin/settings/authors/[id]", query: { id: String(response.id) } });
                    },
                    onError: (error) => {
                        if (axios.isAxiosError(error)) {
                            for (const errorField in error.response?.data.errors) {
                                setFieldError(errorField, error.response?.data.errors[errorField][0]);
                            }
                        }
                    },
                }
            );
        },
    };
    return (
        <Form config={config}>
            {({ values, dirty }) => (
                <Flex direction="column" gap={32}>
                    <Flex gap={8} align="center">
                        <Text
                            sx={{
                                color: theme.colors.gray45[0],
                            }}>
                            Статус:
                        </Text>
                        <FSwitch labelPosition="left" variant="secondary" name="isActive" label="Активировать" />
                    </Flex>
                    <Fieldset label="Личные данные" icon={<User />}>
                        <Box>
                            <Flex gap={24}>
                                <Avatar
                                    src={values.avatar?.absolutePath}
                                    alt="avatar"
                                    w={84}
                                    h={84}
                                    radius={50}
                                    styles={(theme) => ({ placeholder: { backgroundColor: theme.colors.grayLight[0] } })}>
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
                    <Fieldset label="Об авторе" icon={<UserDescriptionIcon />}>
                        <FTextarea
                            name="about"
                            description="до 230 символов"
                            w="100%"
                            maw={772}
                            sx={{
                                textarea: {
                                    minHeight: 190,
                                },
                            }}
                        />
                    </Fieldset>
                    <Flex gap={8}>
                        <Button variant="border" size="large" onClick={onClose} w="100%" maw={252}>
                            Отменить
                        </Button>
                        <Button type="submit" variant="secondary" size="large" w="100%" maw={252} disabled={!dirty}>
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>
            )}
        </Form>
    );
};

export default CreateAuthorForm;
