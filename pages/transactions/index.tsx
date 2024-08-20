import React, { ReactElement } from "react";
import { UserLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils";
import { TransactionsPage } from "@pages/transactions";
import { UserPage } from "@components/UserPage";

const Transactions: NextPageWithLayout = () => {
    return (
        <UserPage title="Мои покупки">
            <TransactionsPage />
        </UserPage>
    );
};

Transactions.getLayout = function (page: ReactElement) {
    return <UserLayout>{page} </UserLayout>;
};

export default Transactions;
