import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useAdminTransaction } from "@entities/transaction";
import { InfoPanel, TransactionSettings } from "@widgets/admin/transactions";
import { getBreadCrumbsItems } from "./utils";

const TransactionDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: transactionData, isLoading, isError } = useAdminTransaction({ id });

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ name: transactionData.entity.type.name, id })} mb={8} />
            <InfoPanel id={id} mb={32} />
            <TransactionSettings id={id} />
        </Box>
    );
};

export default TransactionDetailsPage;
