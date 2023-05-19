import { Box, Text, Flex, Avatar } from "@mantine/core";
import React from "react";
import { Edit3, User } from "react-feather";
import { useRouter } from "next/router";
import { IconClipboardText } from "@tabler/icons-react";
import { Button, FFileButton, FFileInput, FInput, FSwitch, FTextarea, ManagedForm } from "@shared/ui";
import AvatarIcon from "public/icons/avatar.svg";
import { Fieldset } from "@components/Fieldset";
import { $UpdateMainBannerRequest, GetMainBannerResponse, UpdateMainBannerRequest, staticPageApi } from "@entities/staticPage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import { adaptDataForEditForm } from "./utils";
import useStyles from "./MainBannerEditForm.styles";

export interface MainBannerEditFormProps {
    data?: GetMainBannerResponse;
    onClose: () => void;
}

const MainBannerEditForm = ({ data, onClose }: MainBannerEditFormProps) => {
    const { classes } = useStyles();
    const router = useRouter();

    const authorFullName = [data?.authorFirstName, data?.authorLastName].join(" ");

    const updateMainBanner = (values: UpdateMainBannerRequest) => {
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

    if (!data) {
        return null;
    }

    return (
        <ManagedForm<UpdateMainBannerRequest, GetMainBannerResponse>
            initialValues={{ ...initialValues, ...adaptDataForEditForm(data) }}
            validationSchema={$UpdateMainBannerRequest}
            mutationKey={[MutationKeys.UPDATE_MAIN_BANNER]}
            keysInvalidateQueries={[{ queryKey: [QueryKeys.GET_MAIN_BANNER] }]}
            mutationFunction={updateMainBanner}
            hasConfirmModal
            onSuccess={onSuccess}
            onCancel={onClose}
            onError={onError}>
            {({ values, dirty, onCancel }) => (
                <Flex direction="column" gap={32}>
                    <FFileInput name="indexBannerFile" title="Изменить фото" type="image" withDeleteButton h={608} w="100%" maw={1320} />

                    <Fieldset label="Детали" icon={<IconClipboardText />} maw={512}>
                        <Flex direction="column" gap={8} w="100%">
                            <FInput name="indexBannerTitle" label="Заголовок баннера" size="sm" />
                            <FInput name="indexBannerSubTitle" label="Подзаголовок" size="sm" />
                            <Flex gap={8}>
                                <FInput name="indexBannerButtonText" label="Программируемая кнопка" size="sm" w="100%" />
                                <FInput name="indexBannerButtonLink" label="Ссылка" size="sm" w="100%" />
                            </Flex>
                        </Flex>
                    </Fieldset>

                    <Box component="fieldset" className={classes.fieldset} maw={512}>
                        <Box component="legend" className={classes.legend}>
                            <User />
                            <Text className={classes.title}>Карточка автора</Text>
                            <FSwitch variant="secondary" name="indexBannerAuthorActive" />
                        </Box>
                        {values.indexBannerAuthorActive && (
                            <Flex direction="column" gap={24} w="100%">
                                <Flex gap={24}>
                                    <Avatar
                                        src={values.indexBannerAuthorAvatar?.absolutePath}
                                        alt="avatar"
                                        w={84}
                                        h={84}
                                        radius={50}
                                        styles={(theme) => ({ placeholder: { backgroundColor: theme.colors.grayLight[0] } })}>
                                        <AvatarIcon />
                                    </Avatar>
                                    <Flex direction="column" justify="center" gap={8}>
                                        <Text className={classes.authorFullName} lineClamp={1}>
                                            {authorFullName}
                                        </Text>
                                        <FFileButton
                                            name="indexBannerAuthorAvatar"
                                            label="Изменить аватар"
                                            buttonProps={{ leftIcon: <Edit3 /> }}
                                        />
                                    </Flex>
                                </Flex>
                                <Flex direction="column" gap={8}>
                                    <Flex gap={8}>
                                        <FInput name="indexBannerAuthorFirstName" label="Имя" size="sm" withAsterisk w="100%" />
                                        <FInput name="indexBannerAuthorLastName" label="Фамилия" size="sm" withAsterisk w="100%" />
                                    </Flex>

                                    <FInput name="indexBannerAuthorAbout" label="Об авторе" size="sm" w="100%" />
                                    <FTextarea name="indexBannerAuthorShortQuote" placeholder="Краткая цитата" />
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

export default MainBannerEditForm;
