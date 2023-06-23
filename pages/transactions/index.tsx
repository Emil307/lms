import React from "react";
import { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { TransactionsPage } from "@pages/transactions";

const Transactions: NextPageWithLayout = () => {
    return <TransactionsPage />;
};

Transactions.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Transactions;
