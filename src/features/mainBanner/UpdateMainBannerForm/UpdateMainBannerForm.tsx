import { Box, Flex, BoxProps } from "@mantine/core";
import React from "react";
import { User } from "react-feather";
import { useRouter } from "next/router";
import { IconClipboardText } from "@tabler/icons-react";
import { Button, FAvatarInput, FFileInput, FInput, FSwitch, FTextarea, Heading, ManagedForm } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { GetMainBannerResponse, staticPageApi } from "@entities/staticPage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification, useMedia } from "@shared/utils";
import { initialValues } from "./constants";
import { adaptDataForEditForm } from "./utils";
import { $UpdateMainBannerFormValidation, UpdateMainBannerFormValidation } from "./types";
import useStyles from "./UpdateMainBannerForm.styles";

export interface UpdateMainBannerFormProps extends Omit<BoxProps, "children"> {
    data: GetMainBannerResponse;
    onClose: () => void;
}

const UpdateMainBannerForm = ({ data, onClose, ...props }: UpdateMainBannerFormProps) => {
    const { classes } = useStyles();
    const router = useRouter();

    const isMobile = useMedia("xs");

    const renderAuthorFullName = () => {
        if (!data.authorFirstName || !data.authorLastName) {
            return null;
        }
        return `${data.authorFirstName} ${data.authorLastName}`;
    };

    const updateMainBanner = (values: UpdateMainBannerFormValidation) => {
        return staticPageApi.updateMainBanner({
            ...values,
            indexBannerImage: values.indexBannerFile?.id,
            indexBannerAuthorImage: values.indexBannerAuthorAvatar?.id,
        });
    };

    const onSuccess = () => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены",
        });
        router.push({ pathname: "/admin/settings/main-page/banner" });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления баннера",
        });
    };

    return (
        <Box {...props}>
            <ManagedForm<UpdateMainBannerFormValidation, GetMainBannerResponse>
                initialValues={{ ...initialValues, ...adaptDataForEditForm(data) }}
                validationSchema={$UpdateMainBannerFormValidation}
                mutationKey={[MutationKeys.UPDATE_MAIN_BANNER]}
                keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_MAIN_BANNER] }]}
                mutationFunction={updateMainBanner}
                hasConfirmModal
                onSuccess={onSuccess}
                onCancel={onClose}
                onError={onError}>
                {({ values, dirty, onCancel }) => {
                    return (
                        <Flex direction="column" gap={32}>
                            <FFileInput
                                name="indexBannerFile"
                                title="Изменить фото"
                                type="image"
                                fileFormats={["png", "gif", "jpeg", "jpg", "svg", "webp"]}
                                withDeleteButton
                                className={classes.bannerFileInput}
                                description="До 1Mb"
                            />

                            <Fieldset label="Детали" icon={<IconClipboardText />} maw={512} legendProps={{ mb: 24 }}>
                                <Flex direction="column" gap={8} w="100%">
                                    <FInput name="indexBannerTitle" label="Заголовок баннера" size="sm" />
                                    <FInput name="indexBannerSubTitle" label="Подзаголовок" size="sm" />
                                    <Flex direction={{ base: "column", xs: "row" }} gap={8}>
                                        <FInput name="indexBannerButtonText" label="Программируемая кнопка" size="sm" w="100%" />
                                        <FInput name="indexBannerButtonLink" label="Ссылка" size="sm" w="100%" />
                                    </Flex>
                                </Flex>
                            </Fieldset>

                            <Box component="fieldset" className={classes.fieldset} maw={512}>
                                <Box component="legend" className={classes.legend}>
                                    <User />
                                    <Heading order={4}>Карточка автора</Heading>
                                    <FSwitch variant="secondary" name="indexBannerAuthorActive" />
                                </Box>
                                {values.indexBannerAuthorActive && (
                                    <Flex direction="column" gap={24} w="100%">
                                        <FAvatarInput
                                            name="indexBannerAuthorAvatar"
                                            label="Изменить аватар"
                                            description="Рекомендуемый размер изображения: 1024х1024 px, до 500Kb"
                                            title={renderAuthorFullName()}
                                        />
                                        <Flex direction="column" gap={8}>
                                            <Flex direction={{ base: "column", xs: "row" }} gap={8}>
                                                <FInput
                                                    name="indexBannerAuthorFirstName"
                                                    label="Имя"
                                                    onlyLetters
                                                    size="sm"
                                                    withAsterisk
                                                    w="100%"
                                                />
                                                <FInput
                                                    name="indexBannerAuthorLastName"
                                                    label="Фамилия"
                                                    onlyLetters
                                                    size="sm"
                                                    withAsterisk
                                                    w="100%"
                                                />
                                            </Flex>

                                            <FInput name="indexBannerAuthorAbout" label="Об авторе" size="sm" w="100%" />
                                            <FTextarea
                                                name="indexBannerAuthorShortQuote"
                                                placeholder="Краткая цитата"
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

export default UpdateMainBannerForm;
