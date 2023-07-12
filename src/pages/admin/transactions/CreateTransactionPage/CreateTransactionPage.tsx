import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { CreateTransactionForm } from "@features/transactions";
import { breadCrumbsItems } from "./constants";

const CreateTransactionPage = () => {
    const router = useRouter();

    const handleCloseCreateForm = () => router.push("/admin/transactions");

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Heading mb={32}>Создание транзакции</Heading>
            <CreateTransactionForm onClose={handleCloseCreateForm} maw={512} />
        </Box>
    );
};

export default CreateTransactionPage;
