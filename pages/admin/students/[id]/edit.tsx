import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { EditStudentPage } from "@pages/admin/students";
import { AdminPage } from "@components/AdminPage";

const StudentEdit: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование данных ученика">
            <EditStudentPage />
        </AdminPage>
    );
};

StudentEdit.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default StudentEdit;
