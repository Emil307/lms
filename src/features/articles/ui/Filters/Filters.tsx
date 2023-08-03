import { ActionIcon, Box, BoxProps, Flex, Group } from "@mantine/core";
import { FormikConfig } from "formik";
import { IconFilter, IconFilterOff } from "@tabler/icons-react";
import { $ArticleAndArticleCategoryFiltersForm, ArticleAndArticleCategoryFiltersForm, useArticlesFilters } from "@entities/article";
import { Button, FSearch, Form } from "@shared/ui";
import { FilterList } from "./components";
import { initialValues } from "./contants";

export interface FiltersProps extends BoxProps {
    data?: ArticleAndArticleCategoryFiltersForm;
    onSubmitFilters: (values: ArticleAndArticleCategoryFiltersForm) => void;
    articleType?: "favorite" | "my-articles" | "by-category" | "by-course";
    courseId?: string;
}

const Filters = ({ data, onSubmitFilters, articleType, courseId, ...props }: FiltersProps) => {
    const articleFilters = useArticlesFilters({ articleType, courseId });

    const config: FormikConfig<ArticleAndArticleCategoryFiltersForm> = {
        initialValues: { ...initialValues, ...data },
        validationSchema: $ArticleAndArticleCategoryFiltersForm.partial(),
        enableReinitialize: true,
        onSubmit: onSubmitFilters,
    };

    return (
        <Box {...props}>
            <Form config={config} isLoading={articleFilters.isLoading} disableOverlay={false}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: initialValues });
                        handleSubmit();
                    };

                    return (
                        <Flex direction="column" gap={32} miw={264}>
                            <FSearch name="query" placeholder="Область, тематика" />
                            <FilterList
                                field="subcategoryIds"
                                filterName="Тематика"
                                searchPlaceholder="Найти тематики"
                                labelsPluralString={["тематика", "тематики", "тематик"]}
                                data={articleFilters.data?.subcategories}
                            />
                            <FilterList
                                field="tags"
                                filterName="Теги"
                                searchPlaceholder="Найти теги"
                                labelsPluralString={["тег", "тега", "тегов"]}
                                data={articleFilters.data?.tags}
                            />
                            <Group sx={{ justifyContent: "center", gap: 8 }}>
                                <Button type="submit" variant="white" leftIcon={<IconFilter />}>
                                    Подобрать
                                </Button>
                                {dirty && (
                                    <ActionIcon onClick={handleResetForm}>
                                        <IconFilterOff />
                                    </ActionIcon>
                                )}
                            </Group>
                        </Flex>
                    );
                }}
            </Form>
        </Box>
    );
};

export default Filters;
