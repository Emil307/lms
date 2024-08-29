import { Box, Drawer, Flex } from "@mantine/core";
import React, { useState } from "react";
import { IconFilter } from "@tabler/icons-react";
import { FormikConfig } from "formik";
import { useRouter } from "next/router";
import { BreadCrumbs, Button, Heading, Form, FSearch, Loader } from "@shared/ui";
import { List as CoursesList, Filters } from "@features/courses";
import { List as CourseCollectionList } from "@features/courseCollections";
import { FilterTypes } from "@shared/constant";
import { useIntersection, useMedia } from "@shared/utils";
import { $CoursesFiltersForm, CoursesFiltersForm, useCourseResources } from "@entities/course";
import { adaptCourseFiltersForm, getCountAppliedQueries, getInitialValues, prepareQueryParams } from "@features/courses/ui/Filters/utils";
import { TRouterQueries } from "@features/courses/ui/Filters/types";
import useStyles from "./CoursesPage.styles";
import { breadCrumbsItems } from "./constants";

const CoursesPage = () => {
    const { classes } = useStyles();
    const [openedDrawer, setOpenDrawer] = useState(false);
    const { data: courseResources, isLoading } = useCourseResources({ type: FilterTypes.SELECT });
    const { ref: rootBlockRef, entry } = useIntersection();
    const isTablet = useMedia("sm");
    const router = useRouter();
    const queryParams = router.query as TRouterQueries;

    if (isLoading || !courseResources) {
        return <Loader size="lg" />;
    }
    const config: FormikConfig<CoursesFiltersForm> = {
        initialValues: { ...getInitialValues([courseResources.prices.highest]), ...adaptCourseFiltersForm(queryParams) },
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
        <Box m="auto">
            <Box maw={1320} m="auto" className={classes.filtersBlock}>
                <BreadCrumbs items={breadCrumbsItems} mb={16} />
                <Heading mb={64}>Онлайн-курсы</Heading>
                <Form config={config} disableOverlay={false}>
                    {({ resetForm }) => {
                        const handleResetForm = () => {
                            resetForm({ values: getInitialValues([courseResources.prices.highest]) });

                            router.push(
                                {
                                    pathname: router.pathname,
                                    query: { page: "1" },
                                },
                                undefined,
                                { shallow: true }
                            );
                        };

                        const countAppliedQueries = getCountAppliedQueries(queryParams, getInitialValues([courseResources.prices.highest]));

                        const isDirty = !!countAppliedQueries || !!queryParams.categoryId;

                        return (
                            <Flex direction="column" gap={16}>
                                <Flex gap={16} align="center" justify="center" mb={64}>
                                    <FSearch name="query" placeholder="Какой курс вам нужен?" w="100%" className={classes.searchInput} />
                                    <Button type="submit" variant="primary">
                                        Найти курс
                                    </Button>
                                </Flex>
                                <Flex gap={8}>
                                    <Button
                                        onClick={() => {
                                            setOpenDrawer(true);
                                        }}
                                        variant="secondary"
                                        className={classes.button}
                                        mb={48}>
                                        <IconFilter />
                                        Фильтры
                                    </Button>
                                    {isDirty && (
                                        <Button className={classes.resetButton} type="button" variant="text" onClick={handleResetForm}>
                                            Сбросить
                                        </Button>
                                    )}
                                </Flex>
                            </Flex>
                        );
                    }}
                </Form>
            </Box>
            <Flex direction="column" maw={1320} m="auto" mb={64} className={classes.coursesBlock}>
                <CoursesList colProps={{ sm: 4 }} />
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
                onClose={() => {
                    setOpenDrawer(false);
                }}
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
                <Filters config={config}></Filters>
            </Drawer>
        </Box>
    );
};

export default CoursesPage;
