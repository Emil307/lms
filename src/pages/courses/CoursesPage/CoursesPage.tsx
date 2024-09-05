import { Box, Drawer, Flex } from "@mantine/core";
import { useState } from "react";
import { IconFilter } from "@tabler/icons-react";
import { FormikConfig } from "formik";
import { useRouter } from "next/router";
import { BreadCrumbs, Button, Heading, Form, FSearch, Loader, Paragraph } from "@shared/ui";
import { List as CourseCollectionList } from "@features/courseCollections";
import { FilterTypes } from "@shared/constant";
import { useIntersection, useMedia } from "@shared/utils";
import { $CoursesFiltersForm, CoursesFiltersForm, useCourseResources } from "@entities/course";
import { InfiniteCourseList } from "@widgets/course";
import useStyles from "./CoursesPage.styles";
import { breadCrumbsItems } from "./constants";
import {
    adaptCourseFiltersForm,
    Filters,
    getInitialValues,
    TRouterQueries,
    prepareQueryParams,
    getCountAppliedQueries,
} from "./components";

const CoursesPage = () => {
    const { classes } = useStyles();
    const [openedDrawer, setOpenDrawer] = useState(false);
    const [coursesCount, setCoursesCount] = useState(0);

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
                    query: { ...router.query, ...prepareQueryParams(values) },
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
                <Heading className={classes.header} mb={64}>
                    Онлайн-курсы
                </Heading>
                <Form config={config} disableOverlay={false}>
                    {({ resetForm }) => {
                        const handleResetForm = () => {
                            resetForm({ values: getInitialValues([courseResources.prices.highest]) });

                            router.push(
                                {
                                    pathname: router.pathname,
                                    query: {},
                                },
                                undefined,
                                { shallow: true }
                            );
                        };

                        const countAppliedQueries = getCountAppliedQueries(queryParams, getInitialValues([courseResources.prices.highest]));

                        const isDirty = !!countAppliedQueries || !!queryParams.categoryId;

                        return (
                            <Flex className={classes.filters}>
                                <Flex gap={16} align="center" justify="center">
                                    <FSearch
                                        name="query"
                                        placeholder="Какой курс вам нужен?"
                                        w="100%"
                                        className={classes.searchInput}
                                        px={16}
                                        py={12}
                                        iconSize={24}
                                    />
                                    <Button type="submit" size="large" variant="primary">
                                        Найти курс
                                    </Button>
                                </Flex>
                                <Flex className={classes.buttonsWrapper}>
                                    <Flex gap={8}>
                                        <Button
                                            onClick={() => {
                                                setOpenDrawer(true);
                                            }}
                                            variant="secondary"
                                            className={classes.button}>
                                            <IconFilter />
                                            Фильтры
                                        </Button>
                                        {isDirty && (
                                            <Button className={classes.resetButton} type="button" variant="text" onClick={handleResetForm}>
                                                Сбросить
                                            </Button>
                                        )}
                                    </Flex>
                                    <Paragraph variant="small-m">Найдено: {coursesCount}</Paragraph>
                                </Flex>
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
