import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { IconReceipt } from "@tabler/icons-react";
import { BreadCrumbs, Heading } from "@shared/ui";
import { List as TransactionList } from "@features/transactions";
import { breadCrumbsItems } from "./constants";

const TransactionsPage = () => {
    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Flex gap={12} align="center" mb={32}>
                <ThemeIcon color="primaryHover" sx={{ width: 32, height: 32 }}>
                    <IconReceipt width={32} height={32} />
                </ThemeIcon>
                <Heading>Мои покупки</Heading>
            </Flex>
            <TransactionList />
        </Box>
    );
};

export default TransactionsPage;
