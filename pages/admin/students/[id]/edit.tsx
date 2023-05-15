import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { UpdateStudentPage } from "@pages/admin/students";
import { AdminPage } from "@components/AdminPage";

const StudentEdit: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование данных ученика">
            <UpdateStudentPage />
        </AdminPage>
    );
};

StudentEdit.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default StudentEdit;
