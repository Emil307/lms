import { ActionIcon, Flex, FlexProps, Group } from "@mantine/core";
import { FormikConfig } from "formik";
import { IconFilter, IconFilterOff } from "@tabler/icons-react";
import { $ArticleCategoryFilters, ArticleCategoryFilters, useArticleFilters } from "@entities/article";
import { Button, FSearch, Form } from "@shared/ui";
import { FilterList } from "./components";

export interface FiltersProps extends FlexProps {}

const Filters = (props: FiltersProps) => {
    const { data: filtersData, isLoading } = useArticleFilters();

    const config: FormikConfig<ArticleCategoryFilters> = {
        initialValues: {
            search: "",
            page: "1",
            tags: [],
            subcategories: [],
        },
        validationSchema: $ArticleCategoryFilters,
        onSubmit: (_values) => {
            return;
        },
    };

    return (
        <Flex {...props}>
            <Form config={config} isLoading={isLoading}>
                {({ dirty, resetForm }) => {
                    const handleResetForm = () => resetForm();

                    return (
                        <Flex direction="column" gap={32} miw={264}>
                            <FSearch name="search" placeholder="Область, тематика" />
                            {filtersData?.subcategories && (
                                <FilterList
                                    field="subcategories"
                                    filterName="Категории"
                                    searchPlaceholder="Найти категории"
                                    labelsPluralString={["категория", "категории", "категорий"]}
                                    filterData={filtersData.subcategories}
                                />
                            )}
                            {filtersData?.tags && (
                                <FilterList
                                    field="tags"
                                    filterName="Теги"
                                    searchPlaceholder="Найти теги"
                                    labelsPluralString={["тег", "тега", "тегов"]}
                                    filterData={filtersData.tags}
                                />
                            )}
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
        </Flex>
    );
};

export default Filters;
