import { Text, Flex } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import { Edit3 } from "react-feather";
import axios from "axios";
import { useRouter } from "next/router";
import { IconFileText } from "@tabler/icons-react";
import { Button, FInput, FMultiSelect, Form, FSelect, FSwitch, FTextEditor } from "@shared/ui";
import { Fieldset } from "@components/Fieldset";
import { $CreateArticleRequest, CreateArticleRequest, useAdminArticleResource, useCreateArticle } from "@entities/article";
import { initialValues } from "./constant";

const ArticleCreateForm = () => {
    const router = useRouter();

    const articleResources = useAdminArticleResource();

    const categoriesOptions = articleResources.data?.categories.data.map((item) => ({
        value: String(item.id),
        label: item.name,
    }));

    const subcategoriesOptions = articleResources.data?.subcategories.data.map((item) => ({
        value: String(item.id),
        label: item.name,
    }));

    const tagsOptions = articleResources.data?.tags.data.map((item) => ({
        value: String(item.id),
        label: item.name,
    }));

    const createArticle = useCreateArticle();

    const handleCancel = () => {
        router.push("/admin/articles");
    };

    const config: FormikConfig<CreateArticleRequest> = {
        initialValues,
        enableReinitialize: true,
        validationSchema: $CreateArticleRequest,
        onSubmit: (values, { setFieldError }) => {
            createArticle.mutate(values, {
                onSuccess: (_response) => {
                    //TODO: добавить редирект когда будет страница просмотра статьи
                },
                onError: (error) => {
                    if (axios.isAxiosError(error)) {
                        for (const errorField in error.response?.data.errors) {
                            setFieldError(errorField, error.response?.data.errors[errorField][0]);
                        }
                    }
                },
            });
        },
    };
    return (
        <Form config={config}>
            {({ values }) => {
                const labelStatus = values.isActive ? "Деактивировать" : "Активировать";
                return (
                    <Flex direction="column" gap={32}>
                        <Flex gap={8} align="center">
                            <Text
                                sx={(theme) => ({
                                    color: theme.colors.gray45[0],
                                })}>
                                Статус:
                            </Text>
                            <FSwitch labelPosition="left" variant="secondary" name="isActive" label={labelStatus} />
                        </Flex>

                        <Fieldset label="Настройки" icon={<Edit3 />} maw={512}>
                            <Flex direction="column" gap={8} w="100%">
                                <FInput name="name" label="Название" />
                                <FSelect
                                    name="categoryId"
                                    size="sm"
                                    data={categoriesOptions ?? []}
                                    clearable
                                    label="Выберите категорию"
                                    disabled={articleResources.isLoading}
                                />
                                <FSelect
                                    name="subcategoryId"
                                    size="sm"
                                    data={subcategoriesOptions ?? []}
                                    clearable
                                    label="Выберите подкатегории"
                                    disabled={articleResources.isLoading}
                                />
                                <FMultiSelect
                                    name="tags"
                                    size="sm"
                                    data={tagsOptions ?? []}
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
                            <Button variant="border" size="large" onClick={handleCancel} w="100%" maw={252}>
                                Отмена
                            </Button>
                            <Button type="submit" variant="secondary" size="large" w="100%" maw={252}>
                                Сохранить
                            </Button>
                        </Flex>
                    </Flex>
                );
            }}
        </Form>
    );
};

export default ArticleCreateForm;
