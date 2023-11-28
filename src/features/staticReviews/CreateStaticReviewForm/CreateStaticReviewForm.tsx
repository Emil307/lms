import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { User, Video } from "react-feather";
import { IconClipboardText } from "@tabler/icons-react";
import { FAvatarInput, FControlButtons, FFileInput, FInput, FSwitch, FTextarea, Heading, ManagedForm, Paragraph } from "@shared/ui";
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
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_ADMIN_STATIC_REVIEWS] }, { queryKey: [QueryKeys.GET_STATIC_REVIEWS] }]}
                mutationFunction={createStaticReview}
                onSuccess={onSuccess}
                onError={onError}>
                {({ values }) => (
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
                            fileFormats={["png", "gif", "jpeg", "jpg", "svg", "webp"]}
                            withDeleteButton
                            className={classes.previewFileInput}
                            description="Рекомендуемый размер для обложки видео-отзыва: 1320х608 px, до 1Mb"
                        />

                        <Fieldset label="Видео" icon={<Video />} maw={772}>
                            <Box w="100%">
                                <FFileInput
                                    name="video"
                                    type="video"
                                    withDeleteButton
                                    fileFormats={["mp4"]}
                                    descriptionInside="Формат mp4. До 64Mb"
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

                        <Flex className={classes.fieldset} maw={512}>
                            <Flex className={classes.fieldsetHeading}>
                                <User />
                                <Heading order={4}>Карточка автора</Heading>
                                <FSwitch variant="secondary" name="authorIsActive" />
                            </Flex>
                            {values.authorIsActive && (
                                <Flex direction="column" gap={24} w="100%">
                                    <FAvatarInput
                                        name="avatar"
                                        label="Загрузить аватар"
                                        description="Рекомендуемый размер изображения: 1024х1024 px, до 500Kb"
                                    />
                                    <Flex direction="column" gap={8}>
                                        <Flex direction={{ base: "column", xs: "row" }} gap={8}>
                                            <FInput name="firstName" label="Имя" onlyLetters size="sm" withAsterisk w="100%" />
                                            <FInput name="lastName" label="Фамилия" onlyLetters size="sm" withAsterisk w="100%" />
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
                        </Flex>
                        <FControlButtons onClose={onClose} />
                    </Flex>
                )}
            </ManagedForm>
        </Box>
    );
};

export default CreateStaticReviewForm;
