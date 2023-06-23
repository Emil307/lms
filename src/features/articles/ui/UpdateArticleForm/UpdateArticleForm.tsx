import { Box, Flex, Text, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { Edit3, ThumbsDown, ThumbsUp } from "react-feather";
import { IconFileText } from "@tabler/icons-react";
import { useRouter } from "next/router";
import {
    Button,
    FInput,
    FMultiSelect,
    FSelect,
    FSwitch,
    FTextEditor,
    LastUpdatedInfo,
    ManagedForm,
    prepareOptionsForSelect,
} from "@shared/ui";
import { GetAdminArticleResponse, UpdateArticleResponse, articleApi, useAdminArticleResourcesCreate } from "@entities/article";
import { Fieldset } from "@components/Fieldset";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { initialValues } from "./constants";
import { adaptUpdateArticleFormValues, adaptUpdateArticleRequest } from "./utils";
import useStyles from "./UpdateArticleForm.styles";
import { $UpdateArticleFormValidation, UpdateArticleFormValidation } from "./types";

export interface UpdateArticleFormProps {
    data?: GetAdminArticleResponse;
    onClose: () => void;
}

const UpdateArticleForm = ({ data, onClose }: UpdateArticleFormProps) => {
    const { classes } = useStyles();
    const router = useRouter();
    const articleResources = useAdminArticleResourcesCreate();

    const updateArticle = (values: UpdateArticleFormValidation) => {
        return articleApi.updateArticle({ ...adaptUpdateArticleRequest(values), id: String(data?.id) });
    };

    const onSuccess = (response: UpdateArticleResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Изменения сохранены",
        });
        router.push({ pathname: "/admin/articles/[id]", query: { id: response.id.toString() } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка обновления статьи",
        });
    };

    return (
        <ManagedForm<UpdateArticleFormValidation, UpdateArticleResponse>
            initialValues={{
                ...initialValues,
                ...adaptUpdateArticleFormValues(data),
            }}
            validationSchema={$UpdateArticleFormValidation}
            mutationKey={[MutationKeys.UPDATE_ARTICLE, String(data?.id)]}
            keysInvalidateQueries={[
                { queryKey: [QueryKeys.GET_ADMIN_ARTICLES] },
                { queryKey: [QueryKeys.GET_ADMIN_ARTICLE, String(data?.id)] },
            ]}
            mutationFunction={updateArticle}
            onSuccess={onSuccess}
            onError={onError}
            hasConfirmModal
            onCancel={onClose}>
            {({ values, dirty, onCancel }) => {
                const labelStatus = values.isActive ? "Деактивировать" : "Активировать";
                return (
                    <Flex direction="column" gap={32}>
                        <Flex mt={24} gap={32} align="center">
                            <Box className={classes.infoItem}>
                                ID: <span>{data?.id}</span>
                            </Box>
                            <Flex gap={8}>
                                <Text className={classes.infoItem}>Статус:</Text>
                                <FSwitch name="isActive" variant="secondary" label={labelStatus} labelPosition="left" />
                            </Flex>
                            <Flex gap={8} align="center">
                                <Text className={classes.ratingTitle}>Рейтинг:</Text>
                                <Flex gap={16}>
                                    <Flex gap={8}>
                                        <ThemeIcon variant="outline" color="dark" className={classes.thumbs}>
                                            <ThumbsUp />
                                        </ThemeIcon>
                                        <Text className={classes.ratingValue}>{data?.likesCount}</Text>
                                    </Flex>
                                    <Flex gap={8}>
                                        <ThemeIcon variant="outline" color="dark" className={classes.thumbs}>
                                            <ThumbsDown />
                                        </ThemeIcon>
                                        <Text className={classes.ratingValue}>{data?.dislikesCount}</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <LastUpdatedInfo data={data?.lastUpdated} />
                        </Flex>
                        <Title order={2} color="dark">
                            Данные статьи
                        </Title>

                        <Fieldset label="Настройки" icon={<Edit3 />} maw={512}>
                            <Flex direction="column" gap={8} w="100%">
                                <FInput name="name" label="Название" />
                                <FSelect
                                    name="categoryId"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: articleResources.data?.categories,
                                        value: "id",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Выберите категорию"
                                    disabled={articleResources.isLoading}
                                />
                                <FMultiSelect
                                    name="subcategories"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: articleResources.data?.subcategories,
                                        value: "id",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Выберите подкатегории"
                                    disabled={articleResources.isLoading}
                                />
                                <FMultiSelect
                                    name="tags"
                                    size="sm"
                                    data={prepareOptionsForSelect({ data: articleResources.data?.tags, value: "id", label: "name" })}
                                    clearable
                                    label="Теги статьи"
                                    disabled={articleResources.isLoading}
                                />
                            </Flex>
                        </Fieldset>
                        <Fieldset label="Контент статьи" icon={<IconFileText />} maw={1162}>
                            <FTextEditor name="content" />
                        </Fieldset>
                        <Flex gap={8}>
                            <Button variant="border" size="large" onClick={onCancel} w="100%" maw={252}>
                                Отмена
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

export default UpdateArticleForm;