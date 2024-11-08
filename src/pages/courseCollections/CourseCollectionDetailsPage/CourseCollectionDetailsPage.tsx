import { Flex, Stack } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { List as CourseCollectionList } from "@features/courseCollections";
import { TRouterQueries } from "@shared/types";
import { useCourseCollection } from "@entities/courseCollection";
import { useMedia } from "@shared/utils";
import { getBreadCrumbsItems } from "./utils";
import useStyles from "./CourseCollectionDetailsPage.styles";
import { CoursesList } from "./components";

const CourseCollectionDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { classes } = useStyles();

    const { data } = useCourseCollection({ id });

    const isTablet = useMedia("sm");

    return (
        <Stack spacing={160}>
            <Flex direction="column" className={classes.container}>
                <BreadCrumbs items={getBreadCrumbsItems({ name: data?.name, isTablet })} mb={16} className={classes.breadCrumbs} />
                <Flex direction="column" className={classes.courseWrapper}>
                    <Flex align="center" gap={12} className={classes.heading}>
                        <Heading className={classes.title}>{data?.name}</Heading>
                    </Flex>
                    <Flex className={classes.courseList}>
                        <CoursesList collectionIds={id} />
                    </Flex>
                </Flex>
            </Flex>
            <Flex direction="column" gap={32}>
                <CourseCollectionList hasCardMore exceptionCourseCollectionId={id} colProps={{ sm: 6, xs: 12 }} />
            </Flex>
        </Stack>
    );
};

export default CourseCollectionDetailsPage;
