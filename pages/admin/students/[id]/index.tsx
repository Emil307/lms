import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { StudentDetailPage } from "@pages/admin/students";
import { AdminPage } from "@components/AdminPage";

const StudentDetail: NextPageWithLayout = () => {
    return (
        <AdminPage title="Настройки ученика">
            <StudentDetailPage />
        </AdminPage>
    );
};

StudentDetail.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default StudentDetail;
