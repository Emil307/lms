import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { TransactionDetailsPage } from "@pages/admin/transactions";

const TransactionDetails: NextPageWithLayout = () => {
    return (
        <AdminPage title="Детали транзакции">
            <TransactionDetailsPage />
        </AdminPage>
    );
};

TransactionDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default TransactionDetails;
