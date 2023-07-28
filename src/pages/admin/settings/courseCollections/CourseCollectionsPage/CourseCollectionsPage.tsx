import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Heading } from "@shared/ui";
import { AdminList as AdminCourseCollectionList } from "@features/courseCollections";
import useStyles from "./CourseCollectionsPage.styles";

const CourseCollectionsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const isTablet = useMediaQuery("(max-width: 1024px)");

    const openCreateCourseCollectionForm = () => router.push("/admin/settings/course-collections/create");

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Подборки курсов</Heading>
                <Button
                    variant="secondary"
                    size={isTablet ? "medium" : "large"}
                    leftIcon={<PlusCircle />}
                    onClick={openCreateCourseCollectionForm}>
                    Создать подборку
                </Button>
            </Flex>
            <AdminCourseCollectionList />
        </Box>
    );
};

export default CourseCollectionsPage;
