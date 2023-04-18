import { ActionIcon, Flex, FlexProps, Group } from "@mantine/core";
import { FormikConfig } from "formik";
import { IconFilter, IconFilterOff } from "@tabler/icons-react";
import { $articleCategoryFilters, ArticleCategoryFilters, useArticleFilters } from "@entities/article";
import { Button, FSearch, Form } from "@shared/ui";
import { FilterBySubCategories, FilterByTags } from "./components";

export interface FiltersProps extends FlexProps {}

const Filters = (props: FiltersProps) => {
    const { data: filtersData, isLoading } = useArticleFilters();

    const config: FormikConfig<ArticleCategoryFilters> = {
        initialValues: {
            search: "",
            page: "1",
            tags: [],
            subCategories: [],
        },
        validationSchema: $articleCategoryFilters,
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
                            {filtersData?.categories && <FilterBySubCategories initialFilterData={filtersData.categories} />}
                            {filtersData?.tags && <FilterByTags initialFilterData={filtersData.tags} />}
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
