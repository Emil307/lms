import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { AdminList as AdminStudentList } from "@features/students";
import { Button, Heading } from "@shared/ui";
import useStyles from "./StudentsPage.styles";

const StudentsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 1024px)");

    const redirectCreateStudent = () => router.push("/admin/students/create");

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Ученики</Heading>
                <Button variant="secondary" size={isTablet ? "medium" : "large"} leftIcon={<PlusCircle />} onClick={redirectCreateStudent}>
                    Создать ученика
                </Button>
            </Flex>
            <AdminStudentList />
        </Box>
    );
};

export default StudentsPage;
