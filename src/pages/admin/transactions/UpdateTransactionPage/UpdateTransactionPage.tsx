import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useAdminTransaction } from "@entities/transaction";
import { InfoPanel } from "@widgets/admin/transactions";
import { UpdateTransactionForm } from "@features/transactions";
import { getBreadCrumbsItems } from "./utils";

const UpdateTransactionPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data: transactionData, isLoading } = useAdminTransaction({ id });

    const handleCancel = () => {
        router.push("/admin/transactions");
    };

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ name: transactionData?.entity.type.name, id })} mb={8} />
            <InfoPanel id={id} mb={32} />
            <UpdateTransactionForm data={transactionData} onClose={handleCancel} maw={512} />
        </Box>
    );
};

export default UpdateTransactionPage;
