import React, { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { CreateStudentPage } from "@pages/admin/students";
import { AdminPage } from "@components/AdminPage";

const CreateStudent: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание ученика">
            <CreateStudentPage />
        </AdminPage>
    );
};

CreateStudent.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page} </AdminLayout>;
};

export default CreateStudent;
