import { ActionIcon, Box, Collapse, Flex, FlexProps, MediaQuery } from "@mantine/core";
import { FormikConfig } from "formik";
import { IconFilter, IconFilterOff } from "@tabler/icons-react";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, FSearch, FSlider, FSwitch, Form, Paragraph, Loader } from "@shared/ui";
import { $CoursesFiltersForm, CoursesFiltersForm, useCourseResources } from "@entities/course";
import { useMedia } from "@shared/utils";
import { FilterTypes } from "@shared/constant";
import { CategoryFilterList, FilterList, ToggleFilterButton } from "./components";
import { adaptCourseFiltersForm, getCountAppliedQueries, getInitialValues, prepareQueryParams } from "./utils";
import { TRouterQueries } from "./types";
import useStyles from "./Filters.styles";

export interface FiltersProps extends Omit<FlexProps, "title" | "onSubmit"> {
    title: ReactNode;
}

const Filters = ({ children, title, ...props }: FiltersProps) => {
    const { classes } = useStyles();
    const [openedFilters, setOpenedFilters] = useState(false);
    const { data: courseResources, isLoading } = useCourseResources({ type: FilterTypes.SELECT });
    const router = useRouter();
    const queryParams = router.query as TRouterQueries;

    const isTablet = useMedia("md");

    useEffect(() => {
        if (isTablet) {
            return setOpenedFilters(false);
        }
        return setOpenedFilters(true);
    }, [isTablet]);

    const handleToggleVisibilityFilters = () => setOpenedFilters((prevState) => !prevState);
    if (isLoading || !courseResources) {
        return <Loader size="lg" />;
    }

    const config: FormikConfig<CoursesFiltersForm> = {
        initialValues: { ...getInitialValues(courseResources.prices.highest), ...adaptCourseFiltersForm(queryParams) },
        validationSchema: $CoursesFiltersForm.partial(),
        enableReinitialize: true,
        onSubmit: (values) => {
            router.push(
                {
                    pathname: router.pathname,
                    query: { ...router.query, ...prepareQueryParams(values), page: "1" },
                },
                undefined,
                { shallow: true }
            );
        },
    };

    return (
        <Box {...props}>
            <Form config={config} disableOverlay={false}>
                {({ resetForm }) => {
                    const handleResetForm = () => {
                        resetForm({ values: getInitialValues(courseResources.prices.highest) });

                        router.push({ pathname: router.pathname, query: { page: "1" } }, undefined, { shallow: true });
                    };

                    const countAppliedQueries = getCountAppliedQueries(queryParams, getInitialValues(courseResources.prices.highest));

                    const isDirty = !!countAppliedQueries || !!queryParams.categoryId;
                    return (
                        <>
                            <Flex className={classes.wrapperTitle}>
                                {title}
                                <FSearch name="query" placeholder="Область, тематика" className={classes.titleSearch} />
                            </Flex>

                            <Flex className={classes.content}>
                                <Flex className={classes.filtersBlock}>
                                    <CategoryFilterList name="categoryId" data={courseResources.categories} />

                                    <MediaQuery largerThan="md" styles={{ display: "none" }}>
                                        <ToggleFilterButton
                                            isOpened={openedFilters}
                                            onClick={handleToggleVisibilityFilters}
                                            countAppliedQueries={countAppliedQueries}
                                        />
                                    </MediaQuery>

                                    <Collapse in={openedFilters} className={classes.wrapperFiltersBlock}>
                                        <Flex className={classes.filtersBlockCollapseInner}>
                                            <FilterList
                                                field="subcategoryIds"
                                                filterName="Тематика"
                                                searchPlaceholder="Найти тематики"
                                                labelsPluralString={["тематика", "тематики", "тематик"]}
                                                data={courseResources.subcategories}
                                                isVisible={openedFilters}
                                            />
                                            <FilterList
                                                field="tags"
                                                filterName="Теги"
                                                searchPlaceholder="Найти теги"
                                                labelsPluralString={["тег", "тега", "тегов"]}
                                                data={courseResources.tags}
                                                isVisible={openedFilters}
                                            />
                                            <Flex direction="column" gap={16}>
                                                <Paragraph variant="text-small-semi">Цена</Paragraph>
                                                <FSlider
                                                    name="discountPrice"
                                                    labelAlwaysOn
                                                    min={courseResources.prices?.lowest || 0}
                                                    max={courseResources.prices?.highest || 0}
                                                    showTextInfo
                                                />
                                            </Flex>
                                            <FSwitch name="hasDiscount" variant="primary" label="Курс со скидкой" labelPosition="left" />
                                            <Flex className={classes.buttonsFormContainer}>
                                                <Button type="submit" variant="white" leftIcon={<IconFilter />}>
                                                    Подобрать
                                                </Button>
                                                {isDirty && (
                                                    <ActionIcon onClick={handleResetForm}>
                                                        <IconFilterOff />
                                                    </ActionIcon>
                                                )}
                                            </Flex>
                                        </Flex>
                                    </Collapse>
                                </Flex>

                                {children}
                            </Flex>
                        </>
                    );
                }}
            </Form>
        </Box>
    );
};

export default Filters;
