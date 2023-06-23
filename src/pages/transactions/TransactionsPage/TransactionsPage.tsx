import { Box, Flex, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { IconReceipt } from "@tabler/icons-react";
import { BreadCrumbs } from "@shared/ui";
import { List as TransactionList } from "@features/transactions";
import { breadCrumbsItems } from "./constants";

const TransactionsPage = () => {
    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Flex gap={12} align="center" mb={32}>
                <ThemeIcon variant="outline" color="primaryHover" sx={{ border: "none", width: 32, height: 32 }}>
                    <IconReceipt width={32} height={32} />
                </ThemeIcon>
                <Title order={1} color="dark">
                    Мои покупки
                </Title>
            </Flex>
            <TransactionList />
        </Box>
    );
};

export default TransactionsPage;
