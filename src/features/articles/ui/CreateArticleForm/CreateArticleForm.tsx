import { Flex, Box, BoxProps } from "@mantine/core";
import React, { useState } from "react";
import { Edit3 } from "react-feather";
import { useRouter } from "next/router";
import { IconFileText } from "@tabler/icons-react";
import { FormikProps } from "formik";
import { flushSync } from "react-dom";
import {
    FControlButtons,
    FInput,
    FMultiSelect,
    FSelect,
    FSwitch,
    FTextEditor,
    ManagedForm,
    Paragraph,
    prepareOptionsForSelect,
} from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { CreateArticleResponse, articleApi, useAdminArticleResourcesCreate } from "@entities/article";
import { MutationKeys } from "@shared/constant";
import { ToastType, createNotification } from "@shared/utils";
import { useAdminSubCategories } from "@entities/category";
import { initialParams, initialValues, keysInvalidateQueries } from "./constants";
import { $CreateArticleFormValidation, CreateArticleFormValidation } from "./types";
import { adaptCreateArticleRequest } from "./utils";

export interface CreateArticleFormProps extends BoxProps {
    onClose: () => void;
}

const CreateArticleForm = ({ onClose, ...props }: CreateArticleFormProps) => {
    const router = useRouter();

    const [selectedCategoryId, setSelectedCategoryId] = useState<string>();

    const articleResources = useAdminArticleResourcesCreate();

    const subCategoriesResources = useAdminSubCategories({
        ...initialParams,
        filter: { parentId: selectedCategoryId },
    });

    const createArticle = (values: CreateArticleFormValidation) => {
        return articleApi.createArticle(adaptCreateArticleRequest(values));
    };

    const onSuccess = (response: CreateArticleResponse) => {
        createNotification({
            type: ToastType.SUCCESS,
            title: "Создание статьи",
            message: "Статья успешно создана",
        });
        router.push({ pathname: "/admin/articles/[id]", query: { id: response.id.toString() } });
    };

    const onError = () => {
        createNotification({
            type: ToastType.WARN,
            title: "Ошибка создания статьи",
        });
    };

    const onChangeFormValues = ({ setFieldValue, values }: FormikProps<CreateArticleFormValidation>) => {
        if (selectedCategoryId !== values.categoryId) {
            setFieldValue("subcategories", []);
            flushSync(() => {
                setSelectedCategoryId(values.categoryId);
            });
        }
    };

    return (
        <Box {...props}>
            <ManagedForm<CreateArticleFormValidation, CreateArticleResponse>
                onChange={onChangeFormValues}
                initialValues={initialValues}
                validationSchema={$CreateArticleFormValidation}
                mutationKey={[MutationKeys.CREATE_ARTICLE]}
                keysInvalidateQueries={keysInvalidateQueries}
                mutationFunction={createArticle}
                onSuccess={onSuccess}
                onError={onError}>
                {({ values }) => {
                    const labelStatus = values.isActive ? "Деактивировать" : "Активировать";

                    return (
                        <Flex direction="column" gap={32}>
                            <Flex align="center" gap={8}>
                                <Paragraph variant="text-small-m" color="neutralMain50">
                                    Статус:
                                </Paragraph>
                                <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelStatus} />
                            </Flex>

                            <Fieldset label="Настройки" icon={<Edit3 />} maw={512}>
                                <Flex direction="column" gap={8} w="100%">
                                    <FInput name="name" label="Название" size="sm" />
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
                            <Fieldset label="Контент статьи" icon={<IconFileText />} maw={1162}>
                                <Box w="100%">
                                    <FTextEditor name="content" contentHeight={272} />
                                </Box>
                            </Fieldset>
                            <FControlButtons onClose={onClose} />
                        </Flex>
                    );
                }}
            </ManagedForm>
        </Box>
    );
};

export default CreateArticleForm;
