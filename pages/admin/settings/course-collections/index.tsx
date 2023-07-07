import React from "react";
import { ReactElement } from "react";
import { AdminLayout } from "@app/layouts";
import { NextPageWithLayout } from "@shared/utils/types";
import { AdminPage } from "@components/AdminPage";
import { CourseCollectionsPage } from "@pages/admin/settings";

const CourseCollections: NextPageWithLayout = () => {
    return (
        <AdminPage title="Подборки курсов">
            <CourseCollectionsPage />
        </AdminPage>
    );
};

CourseCollections.getLayout = function (page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export default CourseCollections;
