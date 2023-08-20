import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { CourseList } from "@widgets/admin/courses";
import useStyles from "./CourseListPage.styles";
import { useMedia } from "@shared/utils";

const CourseListPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const isTablet = useMedia("md");

    const openCreateCourseForm = () => router.push({ pathname: "/admin/courses/create" });

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Курсы</Heading>
                <Button variant="secondary" size={isTablet ? "medium" : "large"} onClick={openCreateCourseForm} leftIcon={<PlusCircle />}>
                    Создать курс
                </Button>
            </Flex>
            <CourseList />
        </Box>
    );
};

export default CourseListPage;
