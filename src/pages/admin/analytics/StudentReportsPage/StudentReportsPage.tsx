import { Box } from "@mantine/core";
import React from "react";
import { Heading } from "@shared/ui";
import { AdminStudentReportList } from "@features/reports";

const StudentReportsPage = () => {
    return (
        <Box>
            <Heading mb={24}>Отчет по ученикам</Heading>
            <AdminStudentReportList />
        </Box>
    );
};

export default StudentReportsPage;
