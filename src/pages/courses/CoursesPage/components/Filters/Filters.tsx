import { Box, Flex, FlexProps, Stack } from "@mantine/core";
import { FormikConfig } from "formik";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { getCountAppliedFilters } from "@shared/ui/CollapsedFiltersBlock/utils";
import { Button, Form, FPriceRangeInput, Loader, Paragraph } from "@shared/ui";
import { FilterTypes } from "@shared/constant";
import { $CoursesFiltersForm, CoursesFiltersForm, useCourseResources } from "@entities/course";
import { DiscountFilter, FilterList } from "./components";
import useStyles from "./Filters.styles";
import { prepareQueryParams } from "./utils";
import { initialCourseFilters } from "../../constants";

export interface FiltersProps extends Omit<FlexProps, "title" | "onSubmit"> {
    title?: ReactNode;
    initialValues: CoursesFiltersForm;
    onSubmit?: (values: CoursesFiltersForm) => void;
}

const Filters = ({ children, title, initialValues, onSubmit, ...props }: FiltersProps) => {
    const { classes } = useStyles();
    const { data: courseResources, isLoading } = useCourseResources({ type: FilterTypes.MANIPULATION });
    const router = useRouter();

    if (isLoading || !courseResources) {
        return <Loader size="lg" />;
    }

    const config: FormikConfig<CoursesFiltersForm> = {
        initialValues,
        validationSchema: $CoursesFiltersForm.partial(),
        enableReinitialize: true,
        onSubmit: (values) => {
            const query = prepareQueryParams(values);
            router.push({ query }, undefined, { shallow: true });
            onSubmit?.(values);
        },
    };

    return (
        <Box {...props}>
            <Form config={config} disableOverlay={false}>
                {({ dirty, values, setValues }) => {
                    const { query, ...currentValues } = values;

                    const countAppliedFilters = getCountAppliedFilters({ initialValues: initialCourseFilters, currentValues });

                    const handleResetForm = () => setValues({ ...initialCourseFilters, query: values.query });

                    return (
                        <Box h="100%">
                            <Flex className={classes.content}>
                                <Flex className={classes.filtersBlock}>
                                    <Flex className={classes.filtersBlockCollapseInner}>
                                        <FilterList field="categoryIds" filterName="Категория" data={courseResources.categories} />
                                        <FilterList field="subcategoryIds" filterName="Тематика" data={courseResources.subcategories} />
                                        <FilterList field="tags" filterName="Теги" data={courseResources.tags} />
                                        <Stack spacing={16}>
                                            <Stack spacing={8}>
                                                <Paragraph variant="large" c="neutralMain50">
                                                    Цена
                                                </Paragraph>
                                                <FPriceRangeInput
                                                    name="discountPrice"
                                                    min={courseResources.prices.lowest}
                                                    max={courseResources.prices.highest}
                                                />
                                            </Stack>
                                            <DiscountFilter name="hasDiscount" />
                                        </Stack>
                                    </Flex>
                                </Flex>
                                <Flex className={classes.buttonsFormContainer}>
                                    <Button type="submit" variant="primary" size="large" disabled={!dirty}>
                                        Показать
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="large"
                                        onClick={handleResetForm}
                                        disabled={!countAppliedFilters}>
                                        Сбросить
                                    </Button>
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
