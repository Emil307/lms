import { Box, Text, Flex, Avatar } from "@mantine/core";
import React from "react";
import { Edit3, User } from "react-feather";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Button, FFileButton, FInput, FSwitch, FTextarea, LastUpdatedInfo, ManagedForm } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { AdminAuthor, UpdateAuthorResponse, authorApi } from "@entities/author";
import AvatarIcon from "@public/icons/avatar.svg";
import UserDescriptionIcon from "@public/icons/userDescription.svg";
import { ToastType, createNotification } from "@shared/utils";
import { MutationKeys, QueryKeys } from "@shared/constant";
import useStyles from "./UpdateAuthorForm.styles";
import { initialValues } from "./constants";
import { adaptDataForUpdateAuthorForm, adaptUpdateAuthorRequest } from "./utils";
import { $UpdateAuthorFormValidation, UpdateAuthorFormValidation } from "./types";

export interface UpdateAuthorFormProps {
    data?: AdminAuthor;
    onClose?: () => void;
}

const UpdateAuthorForm = ({ data, onClose = () => undefined }: UpdateAuthorFormProps) => {
    const { classes } = useStyles();
    const router = useRouter();

    const updateAuthor = (values: UpdateAuthorFormValidation) => {
        return authorApi.updateAuthor({ ...adaptUpdateAuthorRequest(values), id: String(data?.id) });
    };

    const onSuccess = (response: UpdateAuthorResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены",
        });
        router.push({ pathname: "/admin/settings/authors/[id]", query: { id: String(response.id) } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления автора",
        });
    };

    return (
        <ManagedForm<UpdateAuthorFormValidation, UpdateAuthorResponse>
            initialValues={{ ...initialValues, ...adaptDataForUpdateAuthorForm(data) }}
            validationSchema={$UpdateAuthorFormValidation}
            mutationKey={[MutationKeys.UPDATE_AUTHOR, String(data?.id)]}
            keysInvalidateQueries={[
                { queryKey: [QueryKeys.GET_ADMIN_AUTHORS] },
                { queryKey: [QueryKeys.GET_ADMIN_AUTHOR, String(data?.id)] },
            ]}
            mutationFunction={updateAuthor}
            onSuccess={onSuccess}
            onError={onError}
            hasConfirmModal
            onCancel={onClose}>
            {({ values, dirty, onCancel }) => {
                const labelStatus = values.isActive ? "Деактивировать" : "Активировать";
                return (
                    <Flex direction="column" gap={32}>
                        <Flex mt={24} gap={32} align="center">
                            <Box className={classes.infoItem}>
                                ID: <span>{data?.id}</span>
                            </Box>
                            <Flex gap={8}>
                                <Text className={classes.infoItem}>Статус:</Text>
                                <FSwitch name="isActive" variant="secondary" label={labelStatus} labelPosition="left" />
                            </Flex>
                            <Box className={classes.infoItem}>
                                Создание: <span>{data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                            </Box>
                            <LastUpdatedInfo data={data?.lastUpdated} />
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
                );
            }}
        </ManagedForm>
    );
};

export default UpdateAuthorForm;
