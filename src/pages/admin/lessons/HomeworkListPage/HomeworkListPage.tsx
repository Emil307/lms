import { Box } from "@mantine/core";
import React from "react";
import { Heading } from "@shared/ui";
import { HomeworkList } from "@widgets/admin/lessons";

const HomeworkListPage = () => {
    return (
        <Box>
            <Heading>Домашние задания</Heading>
            <HomeworkList />
        </Box>
    );
};

export default HomeworkListPage;
