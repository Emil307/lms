import { Flex } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { List as CourseCollectionList } from "@features/courseCollections";
import { TRouterQueries } from "@shared/types";
import { List as CoursesList } from "@features/courses";
import { useCourseCollection } from "@entities/courseCollection";
import { useMedia } from "@shared/utils";
import { getBreadCrumbsItems } from "./utils";
import useStyles from "./CourseCollectionDetailsPage.styles";

const CourseCollectionDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { classes } = useStyles();

    const { data } = useCourseCollection({ id });

    const isTablet = useMedia("sm");

    return (
        <>
            <Flex direction="column" className={classes.container}>
                <BreadCrumbs
                    items={getBreadCrumbsItems({ name: data?.name, isTablet: isTablet })}
                    mb={16}
                    className={classes.breadCrumbs}
                />
                <Flex direction="column" className={classes.courseWrapper}>
                    <Flex align="center" gap={12} className={classes.heading}>
                        <Heading className={classes.title}>{data?.name}</Heading>
                    </Flex>
                    <Flex className={classes.courseList}>
                        <CoursesList collectionIds={id} pt={48} />
                    </Flex>
                </Flex>
            </Flex>
            <Flex direction="column" gap={32} mt={64}>
                <CourseCollectionList perPage={10} hasCardMore exceptionCourseCollectionId={id} colProps={{ sm: 6, xs: 12 }} />
            </Flex>
        </>
    );
};

export default CourseCollectionDetailsPage;
