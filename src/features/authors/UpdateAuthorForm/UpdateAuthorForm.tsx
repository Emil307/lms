import { Flex } from "@mantine/core";
import React from "react";
import { User } from "react-feather";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Button, FAvatarInput, FInput, FSwitch, FTextarea, LastUpdatedInfo, ManagedForm, Paragraph } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { AdminAuthor, UpdateAuthorResponse, authorApi } from "@entities/author";
import UserDescriptionIcon from "@public/icons/userDescription.svg";
import { ToastType, createNotification, useMedia } from "@shared/utils";
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

    const isMobile = useMedia("xs");

    const userFullName = [data?.lastName, data?.firstName, data?.patronymic].join(" ");

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
                        <Flex className={classes.infoPanel}>
                            <Flex gap={8}>
                                <Paragraph variant="text-small-m" color="gray45">
                                    ID:
                                </Paragraph>
                                <Paragraph variant="text-small-m">{data?.id}</Paragraph>
                            </Flex>
                            <Flex align="center" gap={8}>
                                <Paragraph variant="text-small-m" color="gray45">
                                    Статус:
                                </Paragraph>
                                <FSwitch name="isActive" variant="secondary" label={labelStatus} labelPosition="left" />
                            </Flex>
                            <Flex gap={8}>
                                <Paragraph variant="text-small-m" color="gray45">
                                    Создание:
                                </Paragraph>
                                <Paragraph variant="text-small-m">
                                    {data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}
                                </Paragraph>
                            </Flex>
                            <LastUpdatedInfo data={data?.lastUpdated} />
                        </Flex>
                        <Fieldset label="Личные данные" icon={<User />} legendProps={{ mb: 24 }} showDivider={false}>
                            <FAvatarInput
                                name="avatar"
                                label="Изменить аватар"
                                description="Рекомендуемый размер изображения: 1024х1024 px, до 500Kb"
                                title={userFullName}
                            />
                            <Flex gap={8} wrap="wrap" mt={24}>
                                <FInput name="firstName" label="Имя" size="sm" miw={{ base: "100%", xs: 252 }} withAsterisk />
                                <FInput name="lastName" label="Фамилия" size="sm" miw={{ base: "100%", xs: 252 }} withAsterisk />
                                <FInput name="patronymic" label="Отчество" size="sm" miw={{ base: "100%", xs: 252 }} />
                            </Flex>
                        </Fieldset>
                        <Fieldset label="Об авторе" icon={<UserDescriptionIcon />} legendProps={{ mb: 24 }}>
                            <FTextarea name="description" description="до 230 символов" className={classes.descriptionTextarea} />
                        </Fieldset>
                        <Flex className={classes.actions}>
                            <Button variant="border" size={isMobile ? "medium" : "large"} onClick={onCancel}>
                                Отменить
                            </Button>
                            <Button type="submit" variant="secondary" size={isMobile ? "medium" : "large"} disabled={!dirty}>
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
