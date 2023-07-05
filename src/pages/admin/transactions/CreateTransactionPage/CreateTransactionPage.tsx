import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { CreateTransactionForm } from "@features/transactions";
import { breadCrumbsItems } from "./constants";

const CreateTransactionPage = () => {
    const router = useRouter();

    const handleCloseCreateForm = () => router.push("/admin/transactions");

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark" mb={32}>
                Создание транзакции
            </Title>
            <CreateTransactionForm onClose={handleCloseCreateForm} maw={512} />
        </Box>
    );
};

export default CreateTransactionPage;
