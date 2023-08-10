import { Box, Flex, Avatar, BoxProps } from "@mantine/core";
import React from "react";
import { Edit3, User, Video } from "react-feather";
import { IconClipboardText } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useMediaQuery } from "@mantine/hooks";
import { Button, FFileButton, FFileInput, FInput, FSwitch, FTextarea, Heading, LastUpdatedInfo, ManagedForm, Paragraph } from "@shared/ui";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { AdminStaticReview, UpdateAdminStaticReviewResponse, staticReviewApi } from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import { adaptDataForUpdateReviewForm, adaptUpdateStaticReviewRequest } from "./utils";
import { $UpdateAdminStaticReviewFormValidation, UpdateAdminStaticReviewFormValidation } from "./types";
import useStyles from "./UpdateStaticReviewForm.styles";

export interface UpdateStaticReviewFormProps extends Omit<BoxProps, "children"> {
    data?: AdminStaticReview;
    onClose: () => void;
}

const UpdateStaticReviewForm = ({ data, onClose, ...props }: UpdateStaticReviewFormProps) => {
    const { classes } = useStyles();

    const isMobile = useMediaQuery("(max-width: 576px)");

    const renderAuthorFullName = () => {
        if (!data?.firstName || !data.lastName) {
            return null;
        }
        return <Paragraph variant="small-semi">{`${data.firstName} ${data.lastName}`}</Paragraph>;
    };

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
        <Box {...props}>
            <ManagedForm<UpdateAdminStaticReviewFormValidation, UpdateAdminStaticReviewResponse>
                initialValues={{ ...initialValues, ...adaptDataForUpdateReviewForm(data) }}
                validationSchema={$UpdateAdminStaticReviewFormValidation}
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
                {({ values, dirty, onCancel }) => {
                    const labelActivitySwitch = values.isActive ? "Деактивировать" : "Активировать";

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
                                    <FSwitch name="isActive" variant="secondary" label={labelActivitySwitch} labelPosition="left" />
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
                            <FFileInput
                                name="preview"
                                title="Изменить фото"
                                type="image"
                                withDeleteButton
                                className={classes.previewFileInput}
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
                                    <Heading order={4}>Карточка автора</Heading>
                                    <FSwitch variant="secondary" name="authorIsActive" />
                                </Box>
                                {values.authorIsActive && (
                                    <Flex direction="column" gap={24}>
                                        <Flex align="center" wrap="wrap" columnGap={24} rowGap={16}>
                                            <Avatar src={values.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                                                <AvatarIcon />
                                            </Avatar>
                                            <Flex direction="column" gap={8}>
                                                {renderAuthorFullName()}
                                                <FFileButton name="avatar" label="Загрузить аватар" buttonProps={{ leftIcon: <Edit3 /> }} />
                                            </Flex>
                                        </Flex>
                                        <Flex direction="column" gap={8}>
                                            <Flex direction={{ base: "column", xs: "row" }} gap={8}>
                                                <FInput name="firstName" label="Имя" size="sm" withAsterisk />
                                                <FInput name="lastName" label="Фамилия" size="sm" withAsterisk />
                                            </Flex>

                                            <FInput name="position" label="Об авторе" size="sm" w="100%" />
                                            <FTextarea
                                                name="quote"
                                                description="Краткая цитата автора до 150 символов"
                                                className={classes.quoteTextarea}
                                            />
                                        </Flex>
                                    </Flex>
                                )}
                            </Box>

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
        </Box>
    );
};

export default UpdateStaticReviewForm;
