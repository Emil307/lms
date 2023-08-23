import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { TransactionReportsPage } from "@pages/admin/analytics";

const TransactionReports: NextPageWithLayout = () => {
    return (
        <AdminPage title="Отчет по продажам">
            <TransactionReportsPage />
        </AdminPage>
    );
};

TransactionReports.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default TransactionReports;
