import { Box, Flex, Title } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { AdminList as AdminTransactionList } from "@features/transactions";

const TransactionsPage = () => {
    const router = useRouter();

    const handleOpenCreateForm = () => router.push("/admin/transactions/create");

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Title order={1} color="dark">
                    Транзакции
                </Title>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={handleOpenCreateForm}>
                    Создать транзакцию
                </Button>
            </Flex>
            <AdminTransactionList mt={32} />
        </Box>
    );
};

export default TransactionsPage;
