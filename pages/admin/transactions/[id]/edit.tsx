import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateTransactionPage } from "@pages/admin/transactions";

const UpdateTransaction: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование транзакции">
            <UpdateTransactionPage />
        </AdminPage>
    );
};

UpdateTransaction.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default UpdateTransaction;
