import { Flex } from "@mantine/core";
import React from "react";
import { User } from "react-feather";
import { useRouter } from "next/router";
import { Button, FAvatarInput, FInput, FSwitch, FTextarea, ManagedForm, Paragraph } from "@shared/ui";
import UserDescriptionIcon from "@public/icons/userDescription.svg";
import { Fieldset } from "@components/Fieldset";
import { CreateAuthorResponse, authorApi } from "@entities/author";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification, useMedia } from "@shared/utils";
import { initialValues } from "./constants";
import { $CreateAuthorFormValidation, CreateAuthorFormValidation } from "./types";
import { adaptCreateAuthorRequest } from "./utils";
import useStyles from "./CreateAuthorForm.styles";

export interface CreateAuthorFormProps {
    onClose: () => void;
}

const CreateAuthorForm = ({ onClose }: CreateAuthorFormProps) => {
    const router = useRouter();

    const { classes } = useStyles();

    const isMobile = useMedia("xs");

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
            {({ dirty, onCancel }) => (
                <Flex direction="column" gap={32}>
                    <Flex align="center" gap={8}>
                        <Paragraph variant="text-small-m" color="gray45">
                            Статус:
                        </Paragraph>
                        <FSwitch labelPosition="left" variant="secondary" name="isActive" label="Активировать" />
                    </Flex>
                    <Fieldset label="Личные данные" icon={<User />} legendProps={{ mb: 24 }} showDivider={false}>
                        <FAvatarInput
                            name="avatar"
                            label="Изменить аватар"
                            description="Рекомендуемый размер изображения: 1024х1024 px, до 500Kb"
                        />
                        <Flex gap={8} wrap="wrap" mt={24}>
                            <FInput name="firstName" label="Имя" onlyLetters size="sm" miw={{ base: "100%", xs: 252 }} withAsterisk />
                            <FInput name="lastName" label="Фамилия" onlyLetters size="sm" miw={{ base: "100%", xs: 252 }} withAsterisk />
                            <FInput name="patronymic" label="Отчество" onlyLetters size="sm" miw={{ base: "100%", xs: 252 }} />
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
            )}
        </ManagedForm>
    );
};

export default CreateAuthorForm;
