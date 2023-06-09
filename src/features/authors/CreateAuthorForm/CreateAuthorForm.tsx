import { Box, Text, Flex, Avatar } from "@mantine/core";
import React from "react";
import { Edit3, User } from "react-feather";
import { useRouter } from "next/router";
import { Button, FFileButton, FInput, FSwitch, FTextarea, ManagedForm } from "@shared/ui";
import AvatarIcon from "@public/icons/avatar.svg";
import UserDescriptionIcon from "@public/icons/userDescription.svg";
import { Fieldset } from "@components/Fieldset";
import { CreateAuthorResponse, authorApi } from "@entities/author";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import { $CreateAuthorFormValidation, CreateAuthorFormValidation } from "./types";
import { adaptCreateAuthorRequest } from "./utils";

export interface CreateAuthorFormProps {
    onClose: () => void;
}

const CreateAuthorForm = ({ onClose }: CreateAuthorFormProps) => {
    const router = useRouter();

    const createAuthor = (values: CreateAuthorFormValidation) => {
        return authorApi.createAuthor(adaptCreateAuthorRequest(values));
    };

    const onSuccess = (response: CreateAuthorResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание автора",
            message: "Автор успешно создан",
        });
        router.push({ pathname: "/admin/settings/authors/[id]", query: { id: String(response.id) } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания автора",
        });
    };

    return (
        <ManagedForm<CreateAuthorFormValidation, CreateAuthorResponse>
            initialValues={initialValues}
            validationSchema={$CreateAuthorFormValidation}
            mutationKey={[MutationKeys.CREATE_AUTHOR]}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_AUTHORS] }]}
            mutationFunction={createAuthor}
            onSuccess={onSuccess}
            onError={onError}
            hasConfirmModal
            onCancel={onClose}>
            {({ values, dirty, onCancel }) => (
                <Flex direction="column" gap={32}>
                    <Flex gap={8} align="center">
                        <Text color="gray45">Статус:</Text>
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
                                <FFileButton name="avatar" type="image" label="Изменить аватар" buttonProps={{ leftIcon: <Edit3 /> }} />
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
                            name="description"
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
                        <Button variant="border" size="large" onClick={onCancel} w="100%" maw={252}>
                            Отменить
                        </Button>
                        <Button type="submit" variant="secondary" size="large" w="100%" maw={252} disabled={!dirty}>
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>
            )}
        </ManagedForm>
    );
};

export default CreateAuthorForm;
