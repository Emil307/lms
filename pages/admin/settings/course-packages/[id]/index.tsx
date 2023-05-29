import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CoursePackageDetailsPage } from "@pages/admin/settings";

const CoursePackageDetails: NextPageWithLayout = () => {
    return (
        <AdminPage title="Страница пакета курсов">
            <CoursePackageDetailsPage />
        </AdminPage>
    );
};

CoursePackageDetails.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CoursePackageDetails;
