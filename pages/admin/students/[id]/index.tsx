import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { StudentDetailsPage } from "@pages/admin/students";
import { AdminPage } from "@components/AdminPage";

const StudentDetails: NextPageWithLayout = () => {
    return (
        <AdminPage title="Настройки ученика">
            <StudentDetailsPage />
        </AdminPage>
    );
};

StudentDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default StudentDetails;
