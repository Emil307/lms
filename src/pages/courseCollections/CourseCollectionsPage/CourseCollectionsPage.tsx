import { Box } from "@mantine/core";
import React from "react";
import { BreadCrumbs, Heading } from "@shared/ui";
import { CourseCollectionsList } from "@widgets/courseCollections";
import { getBreadCrumbsItems } from "./utils";
import useStyles from "./CourseCollectionsPage.styles";

const CourseCollectionsPage = () => {
    const title = "Подборки";
    const { classes } = useStyles();

    return (
        <Box maw={1320} m="auto">
            <BreadCrumbs items={getBreadCrumbsItems({ title })} mb={16} className={classes.breadCrumbs} />
            <Heading className={classes.title}>{title}</Heading>
            <Box className={classes.collectionsWrapper}>
                <CourseCollectionsList />
            </Box>
        </Box>
    );
};

export default CourseCollectionsPage;
