import { ActionIcon, Box, BoxProps, Collapse, Flex, Group, MediaQuery } from "@mantine/core";
import { FormikConfig } from "formik";
import { IconFilter, IconFilterOff } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { $ArticleAndArticleCategoryFiltersForm, ArticleAndArticleCategoryFiltersForm, useArticlesFilters } from "@entities/article";
import { Button, FSearch, Form } from "@shared/ui";
import { useMedia } from "@shared/utils";
import { FilterList, ToggleFilterButton } from "./components";
import { initialValues } from "./contants";
import useStyles from "./Filters.styles";
import { TRouterQueries } from "./types";
import { getCountAppliedQueries } from "./utils";

export interface FiltersProps extends BoxProps {
    data?: ArticleAndArticleCategoryFiltersForm;
    onSubmitFilters: (values: ArticleAndArticleCategoryFiltersForm) => void;
    articleType?: "favorite" | "my-articles" | "by-category" | "by-course";
    courseId?: string;
}

const Filters = ({ data, onSubmitFilters, articleType, courseId, ...props }: FiltersProps) => {
    const [openedFilters, setOpenedFilters] = useState(false);

    const { classes } = useStyles();
    const router = useRouter();
    const queryParams = router.query as TRouterQueries;

    const articleFilters = useArticlesFilters({ articleType, courseId });

    const isTablet = useMedia("md");

    useEffect(() => {
        if (isTablet) {
            return setOpenedFilters(false);
        }
        return setOpenedFilters(true);
    }, [isTablet]);

    const handleToggleVisibilityFilters = () => setOpenedFilters((prevState) => !prevState);

    const config: FormikConfig<ArticleAndArticleCategoryFiltersForm> = {
        initialValues: { ...initialValues, ...data },
        validationSchema: $ArticleAndArticleCategoryFiltersForm.partial(),
        enableReinitialize: true,
        onSubmit: onSubmitFilters,
    };

    return (
        <Box {...props} className={(classes.root, props.className)}>
            <Form config={config} isLoading={articleFilters.isLoading} disableOverlay={false}>
                {({ dirty, resetForm, handleSubmit }) => {
                    const handleResetForm = () => {
                        resetForm({ values: initialValues });
                        handleSubmit();
                    };

                    return (
                        <Flex className={classes.filtersBlock}>
                            <FSearch name="query" placeholder="Область, тематика" className={classes.searchFilter} />
                            <MediaQuery largerThan="md" styles={{ display: "none" }}>
                                <ToggleFilterButton
                                    isOpened={openedFilters}
                                    onClick={handleToggleVisibilityFilters}
                                    countAppliedQueries={getCountAppliedQueries(queryParams, initialValues)}
                                />
                            </MediaQuery>

                            <Collapse in={openedFilters} className={classes.wrapperFiltersBlock}>
                                <Flex className={classes.filtersBlockCollapseInner}>
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
                                    <Flex className={classes.buttonsFormContainer}>
                                        <Button type="submit" variant="white" leftIcon={<IconFilter />}>
                                            Подобрать
                                        </Button>
                                        {dirty && (
                                            <ActionIcon onClick={handleResetForm}>
                                                <IconFilterOff />
                                            </ActionIcon>
                                        )}
                                    </Flex>
                                </Flex>
                            </Collapse>
                        </Flex>
                    );

                    return (
                        <>
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
                        </>
                    );
                }}
            </Form>
        </Box>
    );
};

export default Filters;
