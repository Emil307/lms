import { Box, Flex, BoxProps } from "@mantine/core";
import { useRouter } from "next/router";
import { IconClipboardText } from "@tabler/icons-react";
import { FControlButtons, FFileInput, FInput, ManagedForm } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { GetMainBannerResponse, staticPageApi } from "@entities/staticPage";
import { EntityNames, MutationKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
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

    const updateMainBanner = (values: UpdateMainBannerFormValidation) => {
        return staticPageApi.updateMainBanner({
            ...values,
            indexBannerImage: values.indexBannerFile?.id,
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
                invalidateQueriesWithPredicateParams={{ entityName: EntityNames.STATIC_MAIN_BANNER }}
                mutationFunction={updateMainBanner}
                onSuccess={onSuccess}
                onCancel={onClose}
                onError={onError}>
                {({ onCancel }) => {
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
                            <FControlButtons onClose={onCancel} />
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default UpdateMainBannerForm;
