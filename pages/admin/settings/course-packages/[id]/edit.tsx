import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { UpdateCoursePackagePage } from "@pages/admin/settings";

const UpdateCoursePackage: NextPageWithLayout = () => {
    return (
        <AdminPage title="Редактирование пакета курсов">
            <UpdateCoursePackagePage />
        </AdminPage>
    );
};

UpdateCoursePackage.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default UpdateCoursePackage;
