import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { AdminList as AdminStudentList } from "@features/students";
import { Button, Heading } from "@shared/ui";
import { useMedia } from "@shared/utils";
import { useUserRole } from "@entities/auth/hooks";
import { Roles } from "@shared/types";
import useStyles from "./StudentsPage.styles";

const StudentsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const userRole = useUserRole();

    const isTablet = useMedia("md");

    const redirectCreateStudent = () => router.push("/admin/students/create");

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Ученики</Heading>
                {userRole && userRole.name !== Roles.teacher && (
                    <Button
                        variant="secondary"
                        size={isTablet ? "medium" : "large"}
                        leftIcon={<PlusCircle />}
                        onClick={redirectCreateStudent}>
                        Создать ученика
                    </Button>
                )}
            </Flex>
            <AdminStudentList />
        </Box>
    );
};

export default StudentsPage;
