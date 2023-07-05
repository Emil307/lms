import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { TransactionsPage } from "@pages/admin/transactions";

const Transactions: NextPageWithLayout = () => {
    return (
        <AdminPage title="Транзакции">
            <TransactionsPage />
        </AdminPage>
    );
};

Transactions.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Transactions;
