import { Box } from "@mantine/core";
import React from "react";
import { Heading } from "@shared/ui";
import { AdminTransactionReportList } from "@features/reports";

const TransactionReportsPage = () => {
    return (
        <Box>
            <Heading mb={24}>Отчет по продажам</Heading>
            <AdminTransactionReportList />
        </Box>
    );
};

export default TransactionReportsPage;
