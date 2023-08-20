import { Box, Flex, ThemeIcon } from "@mantine/core";
import React, { useState } from "react";
import { Edit3, ThumbsDown, ThumbsUp } from "react-feather";
import { IconFileText } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { FormikProps } from "formik";
import {
    Button,
    FInput,
    FMultiSelect,
    FSelect,
    FSwitch,
    FTextEditor,
    Heading,
    LastUpdatedInfo,
    ManagedForm,
    Paragraph,
    prepareOptionsForSelect,
} from "@shared/ui";
import { GetAdminArticleResponse, UpdateArticleResponse, articleApi, useAdminArticleResourcesCreate } from "@entities/article";
import { Fieldset } from "@components/Fieldset";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { ToastType, createNotification, useMedia } from "@shared/utils";
import { useAdminSubCategories } from "@entities/category";
import { initialParams, initialValues } from "./constants";
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
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(String(data?.category?.id));
    const articleResources = useAdminArticleResourcesCreate();
    const isMobile = useMedia("xs");

    const subCategoriesResources = useAdminSubCategories({
        ...initialParams,
        filter: { parentId: selectedCategoryId },
    });

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

    const onChangeFormValues = ({ setFieldValue, values }: FormikProps<UpdateArticleFormValidation>) => {
        if (selectedCategoryId !== values.categoryId) {
            setFieldValue("subcategories", []);
            setSelectedCategoryId(values.categoryId);
        }
    };

    return (
        <ManagedForm<UpdateArticleFormValidation, UpdateArticleResponse>
            onChange={onChangeFormValues}
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
                            <Flex align="center" gap={8}>
                                <Paragraph variant="text-small-m" color="gray45">
                                    Рейтинг:
                                </Paragraph>
                                <Flex gap={16}>
                                    <Flex gap={8}>
                                        <ThemeIcon color="dark">
                                            <ThumbsUp />
                                        </ThemeIcon>
                                        <Paragraph variant="small-semi">{data?.likesCount}</Paragraph>
                                    </Flex>
                                    <Flex gap={8}>
                                        <ThemeIcon color="dark">
                                            <ThumbsDown />
                                        </ThemeIcon>
                                        <Paragraph variant="small-semi">{data?.dislikesCount}</Paragraph>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <LastUpdatedInfo data={data?.lastUpdated} />
                        </Flex>

                        <Heading order={2}>Данные статьи</Heading>

                        <Fieldset label="Настройки" icon={<Edit3 />} maw={512} legendProps={{ mb: 24 }}>
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
                                        data: subCategoriesResources.data,
                                        value: "id",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Выберите подкатегории"
                                    disabled={
                                        !values.categoryId || subCategoriesResources.isLoading || !subCategoriesResources.data?.length
                                    }
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
                        <Fieldset label="Контент статьи" icon={<IconFileText />} legendProps={{ mb: 24 }} maw={1162}>
                            <Box w="100%">
                                <FTextEditor name="content" contentHeight={272} />
                            </Box>
                        </Fieldset>
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
    );
};

export default UpdateArticleForm;
