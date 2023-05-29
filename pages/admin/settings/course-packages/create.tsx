import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CreateCoursePackagePage } from "@pages/admin/settings";

const CreateCoursePackage: NextPageWithLayout = () => {
    return (
        <AdminPage title="Создание пакета курсов">
            <CreateCoursePackagePage />
        </AdminPage>
    );
};

CreateCoursePackage.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CreateCoursePackage;
