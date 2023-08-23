import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { StudentReportsPage } from "@pages/admin/analytics";

const StudentReports: NextPageWithLayout = () => {
    return (
        <AdminPage title="Отчет по ученикам">
            <StudentReportsPage />
        </AdminPage>
    );
};

StudentReports.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default StudentReports;
