import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { User, Video } from "react-feather";
import { IconClipboardText } from "@tabler/icons-react";
import dayjs from "dayjs";
import {
    FAvatarInput,
    FControlButtons,
    FFileInput,
    FInput,
    FSwitch,
    FTextarea,
    Heading,
    LastUpdatedInfo,
    ManagedForm,
    Paragraph,
} from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { AdminStaticReview, UpdateAdminStaticReviewResponse, staticReviewApi } from "@entities/staticReview";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import { adaptDataForUpdateReviewForm, adaptUpdateStaticReviewRequest } from "./utils";
import { $UpdateAdminStaticReviewFormValidation, UpdateAdminStaticReviewFormValidation } from "./types";
import useStyles from "./UpdateStaticReviewForm.styles";

export interface UpdateStaticReviewFormProps extends Omit<BoxProps, "children"> {
    data: AdminStaticReview;
    onClose: () => void;
}

const UpdateStaticReviewForm = ({ data, onClose, ...props }: UpdateStaticReviewFormProps) => {
    const { classes } = useStyles();

    const renderAuthorFullName = () => {
        if (!data.firstName || !data.lastName) {
            return null;
        }
        return `${data.firstName} ${data.lastName}`;
    };

    const updateStaticReview = (values: UpdateAdminStaticReviewFormValidation) => {
        return staticReviewApi.updateAdminStaticReview({ ...adaptUpdateStaticReviewRequest(values), id: String(data.id) });
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
                mutationKey={[MutationKeys.UPDATE_STATIC_REVIEW, String(data.id)]}
                keysInvalidateQueries={[
                    { queryKey: [QueryKeys.GET_ADMIN_STATIC_REVIEWS] },
                    { queryKey: [QueryKeys.GET_ADMIN_STATIC_REVIEW, String(data.id)] },
                ]}
                mutationFunction={updateStaticReview}
                onSuccess={onSuccess}
                hasConfirmModal
                onCancel={onClose}
                onError={onError}>
                {({ values, onCancel }) => {
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

                            <Box component="fieldset" className={classes.fieldset} maw={512}>
                                <Box component="legend" className={classes.legend}>
                                    <User />
                                    <Heading order={4}>Карточка автора</Heading>
                                    <FSwitch variant="secondary" name="authorIsActive" />
                                </Box>
                                {values.authorIsActive && (
                                    <Flex direction="column" gap={24}>
                                        <FAvatarInput
                                            name="avatar"
                                            label="Загрузить аватар"
                                            description="Рекомендуемый размер изображения: 1024х1024 px, до 500Kb"
                                            title={renderAuthorFullName()}
                                        />
                                        <Flex direction="column" gap={8}>
                                            <Flex direction={{ base: "column", xs: "row" }} gap={8}>
                                                <FInput name="firstName" label="Имя" onlyLetters size="sm" withAsterisk />
                                                <FInput name="lastName" label="Фамилия" onlyLetters size="sm" withAsterisk />
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
                            <FControlButtons onClose={onCancel} />
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default UpdateStaticReviewForm;
