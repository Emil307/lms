import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CreateTransactionPage } from "@pages/admin/transactions";

const CreateTransaction: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание транзакции">
            <CreateTransactionPage />
        </AdminPage>
    );
};

CreateTransaction.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CreateTransaction;
