import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { List as StudentList } from "@features/students";
import { Button, Heading } from "@shared/ui";

const StudentsPage = () => {
    const router = useRouter();

    const redirectCreateStudent = () => router.push("/admin/students/create");

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Heading>Ученики</Heading>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={redirectCreateStudent}>
                    Создать ученика
                </Button>
            </Flex>
            <StudentList />
        </Box>
    );
};

export default StudentsPage;
