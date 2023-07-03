import { Box, Text, Flex, Avatar } from "@mantine/core";
import React from "react";
import { Edit3, User, Video } from "react-feather";
import { IconClipboardText } from "@tabler/icons-react";
import { Button, FFileButton, FFileInput, FInput, FSwitch, FTextarea, LastUpdatedInfo, ManagedForm } from "@shared/ui";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import {
    $UpdateAdminStaticReviewRequest,
    AdminStaticReview,
    UpdateAdminStaticReviewResponse,
    staticReviewApi,
} from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import useStyles from "./UpdateStaticReviewForm.styles";
import { adaptDataForUpdateReviewForm, adaptUpdateStaticReviewRequest } from "./utils";
import { UpdateAdminStaticReviewFormValidation } from "./types";
import dayjs from "dayjs";

export interface UpdateStaticReviewFormProps {
    data?: AdminStaticReview;
    onClose: () => void;
}

const UpdateStaticReviewForm = ({ data, onClose }: UpdateStaticReviewFormProps) => {
    const { classes } = useStyles();

    const updateStaticReview = (values: UpdateAdminStaticReviewFormValidation) => {
        return staticReviewApi.updateAdminStaticReview({ ...adaptUpdateStaticReviewRequest(values), id: String(data?.id) });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены",
        });
        onClose();
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновление статического отзыва",
        });
    };

    return (
        <ManagedForm<UpdateAdminStaticReviewFormValidation, UpdateAdminStaticReviewResponse>
            initialValues={{ ...initialValues, ...adaptDataForUpdateReviewForm(data) }}
            validationSchema={$UpdateAdminStaticReviewRequest}
            mutationKey={[MutationKeys.UPDATE_STATIC_REVIEW, data?.id.toString()]}
            keysInvalidateQueries={[
                { queryKey: [QueryKeys.GET_ADMIN_STATIC_REVIEWS] },
                { queryKey: [QueryKeys.GET_ADMIN_STATIC_REVIEWS, data?.id.toString()] },
            ]}
            mutationFunction={updateStaticReview}
            onSuccess={onSuccess}
            hasConfirmModal
            onCancel={onClose}
            onError={onError}>
            {({ values, dirty }) => {
                const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";
                return (
                    <Flex direction="column" gap={32}>
                        <Flex mt={24} gap={32} align="center">
                            <Box className={classes.infoItem}>
                                ID: <span>{data?.id}</span>
                            </Box>
                            <Flex gap={8}>
                                <Text color="gray45">Статус:</Text>
                                <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelActivitySwitch} />
                            </Flex>
                            <Box className={classes.infoItem}>
                                Создание: <span>{data?.createdAt ? dayjs(data.createdAt).format("DD.MM.YYYY HH:mm") : "-"}</span>
                            </Box>
                            <LastUpdatedInfo data={data?.lastUpdated} />
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
                                        <Flex direction="column" gap={8}>
                                            <Text className={classes.userFullName}>{`${data?.firstName} ${data?.lastName}`}</Text>
                                            <FFileButton name="avatar" label="Загрузить аватар" buttonProps={{ leftIcon: <Edit3 /> }} />
                                        </Flex>
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

                        <Flex gap={8} mt={32}>
                            <Button variant="border" size="large" onClick={onClose} w="100%" maw={252}>
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

export default UpdateStaticReviewForm;
