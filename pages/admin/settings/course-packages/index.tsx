import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CoursePackagesPage } from "@pages/admin/settings";

const CoursePackages: NextPageWithLayout = () => {
    return (
        <AdminPage title="Пакеты курсов">
            <CoursePackagesPage />
        </AdminPage>
    );
};

CoursePackages.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CoursePackages;
