import { Box, Flex, FlexProps } from "@mantine/core";
import { FormikConfig } from "formik";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { Button, Form, Paragraph, Loader } from "@shared/ui";
import { CoursesFiltersForm, useCourseResources } from "@entities/course";
import { FilterTypes } from "@shared/constant";
import PriceRangeInput from "@shared/ui/Forms/PriceRangeInput/PriceRangeInput";
import { DiscountFilter } from "@features/courses/ui/Filters/components/DiscountFilter";
import { CategoryFilterList, FilterList } from "./components";
import { getCountAppliedQueries, getInitialValues } from "./utils";
import { TRouterQueries } from "./types";
import useStyles from "./Filters.styles";

export interface FiltersProps extends Omit<FlexProps, "title" | "onSubmit"> {
    title?: ReactNode;
    config: FormikConfig<CoursesFiltersForm>;
}

const Filters = ({ children, title, ...props }: FiltersProps) => {
    const { classes } = useStyles();
    const { data: courseResources, isLoading } = useCourseResources({ type: FilterTypes.SELECT });
    const router = useRouter();
    const queryParams = router.query as TRouterQueries;

    if (isLoading || !courseResources) {
        return <Loader size="lg" />;
    }

    return (
        <Box {...props}>
            <Form config={props.config} disableOverlay={false}>
                {({ resetForm }) => {
                    const handleResetForm = () => {
                        resetForm({ values: getInitialValues([courseResources.prices.highest]) });

                        router.push({ pathname: router.pathname, query: { page: "1" } }, undefined, { shallow: true });
                    };

                    const countAppliedQueries = getCountAppliedQueries(queryParams, getInitialValues([courseResources.prices.highest]));

                    const isDirty = !!countAppliedQueries || !!queryParams.categoryId;
                    return (
                        <Box h="100%">
                            <Flex className={classes.content}>
                                <Flex className={classes.filtersBlock}>
                                    <Paragraph variant="text-small-semi" opacity={0.5}>
                                        Категория
                                    </Paragraph>
                                    <CategoryFilterList name="categoryId" data={courseResources.categories} />

                                    <Flex className={classes.filtersBlockCollapseInner}>
                                        <FilterList
                                            field="subcategoryIds"
                                            filterName="Тематика"
                                            searchPlaceholder="Найти тематики"
                                            labelsPluralString={["тематика", "тематики", "тематик"]}
                                            data={courseResources.subcategories}
                                        />
                                        <FilterList
                                            field="tags"
                                            filterName="Теги"
                                            searchPlaceholder="Найти теги"
                                            labelsPluralString={["тег", "тега", "тегов"]}
                                            data={courseResources.tags}
                                        />
                                        <Flex direction="column" gap={16}>
                                            <Paragraph variant="text-small-semi" opacity={0.5}>
                                                Цена
                                            </Paragraph>
                                            <PriceRangeInput
                                                name="discountPrice"
                                                min={courseResources.prices.lowest || 0}
                                                max={courseResources.prices.highest || 0}
                                            />
                                        </Flex>
                                        <DiscountFilter name="hasDiscount" />
                                    </Flex>
                                </Flex>
                                <Flex className={classes.buttonsFormContainer}>
                                    <Button className={classes.searchButton} type="submit" variant="secondary">
                                        Показать
                                    </Button>
                                    {isDirty && (
                                        <Button className={classes.resetButton} type="button" variant="secondary" onClick={handleResetForm}>
                                            Сбросить
                                        </Button>
                                    )}
                                </Flex>
                            </Flex>
                        </Box>
                    );
                }}
            </Form>
        </Box>
    );
};

export default Filters;
