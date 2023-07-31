import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { StudentsPage } from "@pages/admin/students";

const Students: NextPageWithLayout = () => {
    return (
        <AdminPage title="Ученики">
            <StudentsPage />
        </AdminPage>
    );
};

Students.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default Students;
