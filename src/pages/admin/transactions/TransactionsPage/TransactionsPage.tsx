import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { AdminList as AdminTransactionList } from "@features/transactions";
import { useMedia } from "@shared/utils";
import useStyles from "./TransactionsPage.styles";

const TransactionsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const isTablet = useMedia("md");

    const handleOpenCreateForm = () => router.push("/admin/transactions/create");

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Транзакции</Heading>
                <Button variant="secondary" size={isTablet ? "medium" : "large"} leftIcon={<PlusCircle />} onClick={handleOpenCreateForm}>
                    Создать транзакцию
                </Button>
            </Flex>
            <AdminTransactionList />
        </Box>
    );
};

export default TransactionsPage;
