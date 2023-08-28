import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { Roles } from "@app/routes";
import { useUserRole } from "@entities/auth";
import { CourseList } from "@widgets/admin/courses";
import { useMedia } from "@shared/utils";
import useStyles from "./CoursesPage.styles";

const CoursesPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const userRole = useUserRole();

    const isTablet = useMedia("md");

    const openCreateCourseForm = () => router.push({ pathname: "/admin/courses/create" });

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Курсы</Heading>

                {userRole !== Roles.teacher && (
                    <Button
                        variant="secondary"
                        size={isTablet ? "medium" : "large"}
                        onClick={openCreateCourseForm}
                        leftIcon={<PlusCircle />}>
                        Создать курс
                    </Button>
                )}
            </Flex>
            <CourseList />
        </Box>
    );
};

export default CoursesPage;
