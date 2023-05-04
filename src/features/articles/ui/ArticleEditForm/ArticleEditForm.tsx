import { Box, Flex, Text, ThemeIcon, Title } from "@mantine/core";
import { FormikConfig } from "formik";
import React from "react";
import axios from "axios";
import { Edit3, ThumbsDown, ThumbsUp } from "react-feather";
import { IconFileText } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Button, FInput, FMultiSelect, FSelect, FSwitch, FTextEditor, Form, prepareOptionsForSelect } from "@shared/ui";
import { AdminArticleDetails, useAdminArticleResource, useUpdateArticle } from "@entities/article";
import { Fieldset } from "@components/Fieldset";
import { initialValues } from "./constants";
import { adaptEditFormRequest, adaptEditFormValues } from "./utils";
import useStyles from "./ArticleEditForm.styles";
import { $updateArticleFormValidation, UpdateArticleFormValidation } from "./types";

export interface ArticleEditFormProps {
    data?: AdminArticleDetails;
    onClose: () => void;
}

const ArticleEditForm = ({ data, onClose }: ArticleEditFormProps) => {
    const { classes } = useStyles();
    const updateArticle = useUpdateArticle(String(data?.id));
    const articleResources = useAdminArticleResource();

    const handleCancel = () => {
        onClose();
    };

    const config: FormikConfig<UpdateArticleFormValidation> = {
        initialValues: {
            ...initialValues,
            ...adaptEditFormValues({ data, resource: articleResources.data }),
        },
        enableReinitialize: true,
        validationSchema: $updateArticleFormValidation,
        onSubmit: (values, { setFieldError }) => {
            updateArticle.mutate(adaptEditFormRequest(values), {
                onSuccess: () => {
                    onClose();
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

                            <Box className={classes.infoItem}>
                                {/* TODO: - информации о последних изменениях на бэке пока нет (кто именно изменил автора) */}
                                Изменение: <span>{data?.updated_at ? dayjs(data.updated_at).format("DD.MM.YYYY HH:mm") : "-"}</span>
                            </Box>
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
                                        data: articleResources.data?.categories.data,
                                        value: "id",
                                        label: "name",
                                    })}
                                    clearable
                                    label="Выберите категорию"
                                    disabled={articleResources.isLoading}
                                />
                                <FSelect
                                    name="subcategoryId"
                                    size="sm"
                                    data={prepareOptionsForSelect({
                                        data: articleResources.data?.subcategories.data,
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
                                    data={prepareOptionsForSelect({ data: articleResources.data?.tags.data, value: "id", label: "name" })}
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

export default ArticleEditForm;
