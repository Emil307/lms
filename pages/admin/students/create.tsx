import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { CreateStudentPage } from "@pages/admin/students";
import { AdminPage } from "@components/AdminPage";

const StudentCreate: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание ученика">
            <CreateStudentPage />
        </AdminPage>
    );
};

StudentCreate.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default StudentCreate;
