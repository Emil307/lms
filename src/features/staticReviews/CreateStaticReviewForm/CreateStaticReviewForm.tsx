import { Box, Flex, Avatar, BoxProps } from "@mantine/core";
import React from "react";
import { Edit3, User, Video } from "react-feather";
import { IconClipboardText } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { Button, FFileButton, FFileInput, FInput, FSwitch, FTextarea, Heading, ManagedForm, Paragraph } from "@shared/ui";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { CreateAdminStaticReviewResponse, staticReviewApi } from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import useStyles from "./CreateStaticReviewForm.styles";
import { $CreateAdminStaticReviewFormValidation, CreateAdminStaticReviewFormValidation } from "./types";
import { adaptCreateStaticReviewRequest } from "./utils";

export interface CreateStaticReviewFormProps extends Omit<BoxProps, "children"> {
    onClose: () => void;
}

const CreateStaticReviewForm = ({ onClose, ...props }: CreateStaticReviewFormProps) => {
    const { classes } = useStyles();

    const isMobile = useMediaQuery("(max-width: 576px)");

    const createStaticReview = (values: CreateAdminStaticReviewFormValidation) => {
        return staticReviewApi.createStaticReview(adaptCreateStaticReviewRequest(values));
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
        <Box {...props}>
            <ManagedForm<CreateAdminStaticReviewFormValidation, CreateAdminStaticReviewResponse>
                initialValues={initialValues}
                validationSchema={$CreateAdminStaticReviewFormValidation}
                mutationKey={[MutationKeys.CREATE_STATIC_REVIEW]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_STATIC_REVIEWS] }]}
                mutationFunction={createStaticReview}
                onSuccess={onSuccess}
                hasConfirmModal
                onCancel={onClose}
                onError={onError}>
                {({ values, dirty, onCancel }) => (
                    <Flex direction="column" gap={32}>
                        <Flex align="center" gap={8}>
                            <Paragraph variant="text-small-m" color="gray45">
                                Статус:
                            </Paragraph>
                            <FSwitch labelPosition="left" variant="secondary" name="isActive" label="Активировать" />
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
                                <Flex direction="column" gap={24} w="100%">
                                    <Flex align="center" wrap="wrap" columnGap={24} rowGap={16}>
                                        <Avatar src={values.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                                            <AvatarIcon />
                                        </Avatar>
                                        <FFileButton name="avatar" label="Загрузить аватар" buttonProps={{ leftIcon: <Edit3 /> }} />
                                    </Flex>
                                    <Flex direction="column" gap={8}>
                                        <Flex direction={{ base: "column", xs: "row" }} gap={8}>
                                            <FInput name="firstName" label="Имя" size="sm" withAsterisk w="100%" />
                                            <FInput name="lastName" label="Фамилия" size="sm" withAsterisk w="100%" />
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
                )}
            </ManagedForm>
        </Box>
    );
};

export default CreateStaticReviewForm;
