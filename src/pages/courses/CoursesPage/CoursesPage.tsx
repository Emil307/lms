import { Box, Drawer, Flex } from "@mantine/core";
import { useState } from "react";
import { FormikConfig } from "formik";
import { useRouter } from "next/router";
import { useDisclosure } from "@mantine/hooks";
import IconFilter from "public/icons/icon24px/filter/filter-default.svg";
import { BreadCrumbs, Button, Heading, Form, FSearch, Loader, Paragraph } from "@shared/ui";
import { List as CourseCollectionList } from "@features/courseCollections";
import { FilterTypes } from "@shared/constant";
import { useIntersection, useMedia } from "@shared/utils";
import { $CoursesFiltersForm, CoursesFiltersForm, useCourseResources } from "@entities/course";
import { InfiniteCourseList } from "@widgets/course";
import { getCountAppliedFilters } from "@shared/ui/CollapsedFiltersBlock/utils";
import useStyles from "./CoursesPage.styles";
import { breadCrumbsItems, initialCourseFilters } from "./constants";
import { adaptCourseFiltersForm, Filters, TRouterQueries, prepareQueryParams } from "./components";
import { CountAppliedFilters } from "./CountAppliedFilters";

const CoursesPage = () => {
    const { classes } = useStyles();
    const [openedDrawer, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
    const [coursesCount, setCoursesCount] = useState(0);

    const { data: courseResources, isLoading } = useCourseResources({ type: FilterTypes.SELECT });
    const { ref: rootBlockRef, entry } = useIntersection();
    const isTablet = useMedia("sm");
    const router = useRouter();
    const queryParams = router.query as TRouterQueries;

    if (isLoading || !courseResources) {
        return <Loader size="lg" />;
    }

    const initialValues = { ...initialCourseFilters, ...adaptCourseFiltersForm(queryParams) };

    const config: FormikConfig<CoursesFiltersForm> = {
        initialValues,
        validationSchema: $CoursesFiltersForm.partial(),
        enableReinitialize: true,
        onSubmit: (values) => {
            closeDrawer();
            router.push({ query: { ...router.query, ...prepareQueryParams(values) } }, undefined, { shallow: true });
        },
    };

    return (
        <Box m="auto">
            <Box maw={1320} m="auto" className={classes.filtersBlock}>
                <BreadCrumbs items={breadCrumbsItems} mb={16} />
                <Heading className={classes.header} mb={64}>
                    Онлайн-курсы
                </Heading>
                <Form config={config} disableOverlay={false}>
                    {({ dirty, resetForm, values }) => {
                        const handleResetForm = () => {
                            resetForm({ values: { ...initialValues, query: values.query } });
                            router.push({ query: { ...(values.query ? { query: values.query } : {}) } }, undefined, { shallow: true });
                        };
                        const { query, ...currentValues } = values;
                        const countAppliedFilters = getCountAppliedFilters({ initialValues: initialCourseFilters, currentValues });
                        return (
                            <Flex className={classes.filters}>
                                <Flex gap={16} align="center" justify="center">
                                    <FSearch size="large" name="query" placeholder="Какой курс вам нужен?" w="100%" />
                                    <Button type="submit" size="large" variant="primary" disabled={!dirty}>
                                        Найти курс
                                    </Button>
                                </Flex>
                                {!!coursesCount && (
                                    <Flex className={classes.buttonsWrapper}>
                                        <Flex gap={8}>
                                            <Button onClick={openDrawer} variant="secondary" leftIcon={<IconFilter />}>
                                                Фильтры
                                                <CountAppliedFilters countAppliedFilters={countAppliedFilters} />
                                            </Button>
                                            {!!countAppliedFilters && (
                                                <Button
                                                    className={classes.resetButton}
                                                    type="button"
                                                    variant="text"
                                                    onClick={handleResetForm}>
                                                    Сбросить
                                                </Button>
                                            )}
                                        </Flex>
                                        <Paragraph variant="small-m">Найдено: {coursesCount}</Paragraph>
                                    </Flex>
                                )}
                            </Flex>
                        );
                    }}
                </Form>
            </Box>
            <Flex direction="column" maw={1320} m="auto" mb={64} className={classes.coursesBlock}>
                <InfiniteCourseList onChangeCoursesCount={setCoursesCount} />
            </Flex>
            <Box ref={rootBlockRef}>
                <CourseCollectionList
                    hasCardMore
                    colProps={{ sm: 6, md: 4 }}
                    skeletonListProps={{
                        mih: 258,
                        radius: 16,
                    }}
                    visible={!!entry?.isIntersecting}
                    wrapperProps={{ direction: "column", gap: 32 }}
                />
            </Box>
            <Drawer
                opened={openedDrawer}
                onClose={closeDrawer}
                position="right"
                size={isTablet ? "100%" : "450px"}
                zIndex={400}
                padding={24}
                classNames={classes}
                title={
                    <Heading order={3} ta="center" pt={12}>
                        Фильтры
                    </Heading>
                }>
                <Filters initialValues={initialValues} onSubmit={closeDrawer} />
            </Drawer>
        </Box>
    );
};

export default CoursesPage;
