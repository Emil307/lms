import { Box, Text, Flex, Avatar } from "@mantine/core";

import React from "react";
import { Edit3, User, Video } from "react-feather";
import { IconClipboardText } from "@tabler/icons-react";
import { Button, FFileButton, FFileInput, FInput, FSwitch, FTextarea, ManagedForm } from "@shared/ui";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import {
    $createAdminStaticReviewRequest,
    AdminStaticReview,
    CreateAdminStaticReviewRequest,
    staticReviewApi,
} from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import useStyles from "./CreateStaticReviewForm.styles";

export interface CreateStaticReviewFormProps {
    onClose: () => void;
}

const CreateStaticReviewForm = ({ onClose }: CreateStaticReviewFormProps) => {
    const { classes } = useStyles();

    const createStaticReview = (values: CreateAdminStaticReviewRequest) => {
        return staticReviewApi.createStaticReview({
            ...values,
            authorAvatarId: values.avatar?.id,
            previewId: values.preview?.id,
            videoId: values.video?.id,
        });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание отзыва",
            message: "Статический отзыв успешно создан",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания статического отзыва",
        });
    };

    return (
        <ManagedForm<CreateAdminStaticReviewRequest, AdminStaticReview>
            initialValues={initialValues}
            validationSchema={$createAdminStaticReviewRequest}
            mutationKey={[MutationKeys.CREATE_STATIC_REVIEW]}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_STATIC_REVIEWS] }]}
            mutationFunction={createStaticReview}
            onSuccess={onSuccess}
            hasConfirmModal
            onCancel={onClose}
            onError={onError}>
            {({ values, dirty, onCancel }) => (
                <Flex direction="column" gap={32}>
                    <Flex gap={8} mt={24} align="center">
                        <Text
                            sx={(theme) => ({
                                color: theme.colors.gray45[0],
                            })}>
                            Статус:
                        </Text>
                        <FSwitch labelPosition="left" variant="secondary" name="isActive" label="Активировать" />
                    </Flex>
                    <FFileInput
                        name="preview"
                        title="Изменить фото"
                        type="image"
                        withDeleteButton
                        h={608}
                        w="100%"
                        maw={1320}
                        description="Рекомендуемый размер для обложки видео-отзыва: 1320х608 px"
                    />

                    <Fieldset label="Видео" icon={<Video />} maw={772}>
                        <Box w="100%">
                            <FFileInput
                                name="video"
                                type="document"
                                withDeleteButton
                                fileFormats={["mp4"]}
                                descriptionInside="Формат mp4"
                            />
                        </Box>
                    </Fieldset>
                    <Fieldset label="Заголовок" icon={<IconClipboardText />} maw={772}>
                        <FInput
                            name="content"
                            label="Текст заголовка отзыва"
                            size="sm"
                            w="100%"
                            withAsterisk
                            description="до 120 символов"
                        />
                    </Fieldset>

                    <Box component="fieldset" className={classes.fieldset} maw={512}>
                        <Box component="legend" className={classes.legend}>
                            <User />
                            <Text className={classes.title}>Карточка автора</Text>
                            <FSwitch variant="secondary" name="authorIsActive" />
                        </Box>
                        {values.authorIsActive && (
                            <Flex direction="column" gap={24}>
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
                                    <FFileButton name="avatar" label="Загрузить аватар" buttonProps={{ leftIcon: <Edit3 /> }} />
                                </Flex>
                                <Flex direction="column" gap={8}>
                                    <Flex gap={8}>
                                        <FInput name="firstName" label="Имя" size="sm" withAsterisk />
                                        <FInput name="lastName" label="Фамилия" size="sm" withAsterisk />
                                    </Flex>

                                    <FInput name="position" label="Об авторе" size="sm" w="100%" />
                                    <FTextarea name="quote" />
                                </Flex>
                            </Flex>
                        )}
                    </Box>

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

export default CreateStaticReviewForm;
