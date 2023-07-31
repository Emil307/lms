import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { AdminList as AdminStudentList } from "@features/students";
import { Button, Heading } from "@shared/ui";

const StudentsPage = () => {
    const router = useRouter();

    const redirectCreateStudent = () => router.push("/admin/students/create");

    return (
        <Box>
            <Flex align="center" justify="space-between" mb={24}>
                <Heading>Ученики</Heading>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={redirectCreateStudent}>
                    Создать ученика
                </Button>
            </Flex>
            <AdminStudentList />
        </Box>
    );
};

export default StudentsPage;
